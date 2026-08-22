/**
 * Geoapify API Service for GlobeTrotter
 * Provides Geocoding, Places, and Routing API integration with in-memory caching and error handling.
 */

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || '0b3e48b72cfa4767a7a4d13d5f96b6bd';
const BASE_GEOCODE_URL = 'https://api.geoapify.com/v1/geocode';
const BASE_PLACES_URL = 'https://api.geoapify.com/v2/places';
const BASE_ROUTING_URL = 'https://api.geoapify.com/v1/routing';

// Simple in-memory cache to prevent redundant API credits usage
const cache = {
  cities: new Map(),
  places: new Map(),
  routes: new Map()
};

const CITY_PHOTO_MAP = {
  mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
  bengaluru: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
  jaipur: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
  agra: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  varanasi: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
  udaipur: 'https://images.unsplash.com/photo-1615837136007-88229b4e0d9b?auto=format&fit=crop&w=800&q=80',
  kochi: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
  munnar: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
  leh: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
  manali: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
  rishikesh: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
  amritsar: 'https://images.unsplash.com/photo-1588097281266-310cead47879?auto=format&fit=crop&w=800&q=80',
  hampi: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80',
  mysuru: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80',
  mysore: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80',
  srinagar: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
  jodhpur: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  jaisalmer: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  tokyo: '/tokyo_city.jpg',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
};

function getCityPhoto(cityName = '') {
  const lower = cityName.toLowerCase();
  for (const key in CITY_PHOTO_MAP) {
    if (lower.includes(key)) return CITY_PHOTO_MAP[key];
  }
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
}

/**
 * 1. Search Cities using Geoapify Geocoding API
 */
export async function searchCities(query = '') {
  if (!query || query.trim().length < 2) return [];

  const cacheKey = query.trim().toLowerCase();
  if (cache.cities.has(cacheKey)) {
    return cache.cities.get(cacheKey);
  }

  try {
    const url = `${BASE_GEOCODE_URL}/search?text=${encodeURIComponent(query)}&type=city&limit=10&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Geoapify error: ${response.statusText}`);

    const data = await response.json();
    const results = (data.results || []).map((item) => ({
      id: `geo-${item.place_id || Math.random().toString(36).substring(2, 9)}`,
      name: item.city || item.name || item.formatted,
      country: item.country || 'Global',
      state: item.state || item.county || '',
      lat: item.lat,
      lon: item.lon,
      image: getCityPhoto(item.city || item.name || ''),
      description: `Discovered destination located in ${item.state ? item.state + ', ' : ''}${item.country}. Coordinates: ${item.lat?.toFixed(2)}°, ${item.lon?.toFixed(2)}°.`,
      costIndex: 'Moderate',
      popularity: 85
    }));

    cache.cities.set(cacheKey, results);
    return results;
  } catch (error) {
    console.warn('Geoapify Geocoding API fetch failed:', error);
    return [];
  }
}

export const searchGeocodeCity = searchCities;

/**
 * 2. Search Points of Interest / Activities near Coordinates using Geoapify Places API
 */
export async function searchPlaces({ lat, lon, category = 'catering', limit = 12 }) {
  if (!lat || !lon) return [];

  const categoryParamMap = {
    Sightseeing: 'tourism.sights,heritage,building.historic',
    'Food & Dining': 'catering.restaurant,catering.cafe',
    Culture: 'entertainment.museum,heritage',
    Adventure: 'activity.sport,natural',
    Nature: 'natural.forest,natural.mountain,leisure.park',
    All: 'tourism,heritage,catering,leisure'
  };

  const categories = categoryParamMap[category] || categoryParamMap['All'];
  const cacheKey = `${lat}_${lon}_${categories}`;

  if (cache.places.has(cacheKey)) {
    return cache.places.get(cacheKey);
  }

  try {
    const url = `${BASE_PLACES_URL}?categories=${categories}&filter=circle:${lon},${lat},15000&limit=${limit}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Geoapify Places error: ${response.statusText}`);

    const data = await response.json();
    const places = (data.features || []).map((feature, idx) => {
      const props = feature.properties || {};
      return {
        id: `place-${props.place_id || idx}`,
        title: props.name || props.street || 'Popular Point of Interest',
        category: category !== 'All' ? category : 'Sightseeing',
        description: props.formatted || `${props.name || 'Attraction'} located in destination area.`,
        cost: Math.floor(Math.random() * 40) + 10,
        duration: '1.5 hours',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
        lat: props.lat,
        lon: props.lon
      };
    });

    cache.places.set(cacheKey, places);
    return places;
  } catch (error) {
    console.warn('Geoapify Places API fetch failed:', error);
    return [];
  }
}

/**
 * 3. Calculate Travel Distance and Route Duration using Geoapify Routing API
 */
export async function calculateRoute(waypoints = []) {
  const validWaypoints = waypoints.filter((w) => w.lat && w.lon);
  if (validWaypoints.length < 2) return null;

  const waypointsString = validWaypoints.map((w) => `${w.lat},${w.lon}`).join('|');
  const cacheKey = waypointsString;

  if (cache.routes.has(cacheKey)) {
    return cache.routes.get(cacheKey);
  }

  try {
    const url = `${BASE_ROUTING_URL}?waypoints=${waypointsString}&mode=drive&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Geoapify Routing error: ${response.statusText}`);

    const data = await response.json();
    const route = data.features?.[0]?.properties;

    if (!route) return null;

    const result = {
      distanceKm: Math.round((route.distance || 0) / 1000),
      distanceMiles: Math.round((route.distance || 0) / 1609.34),
      timeHours: ((route.time || 0) / 3600).toFixed(1),
      legs: route.legs || []
    };

    cache.routes.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Geoapify Routing API fetch failed:', error);
    return null;
  }
}
