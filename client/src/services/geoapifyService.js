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

// Fallback high-resolution city photos by name
const CITY_PHOTO_MAP = {
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  tokyo: '/tokyo_city.jpg',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  amsterdam: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  berlin: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80',
  singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'
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
    const url = `${BASE_GEOCODE_URL}/search?text=${encodeURIComponent(query)}&type=city&format=json&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Geoapify Geocode error: ${response.statusText}`);

    const data = await response.json();
    const results = (data.results || []).map((item) => ({
      id: item.place_id || `geo-${item.lat}-${item.lon}`,
      name: item.city || item.name || item.formatted?.split(',')[0] || query,
      country: item.country || '',
      countryCode: item.country_code?.toUpperCase() || '',
      lat: item.lat,
      lon: item.lon,
      region: item.state || item.region || item.country || 'Global',
      costIndex: item.country_code === 'US' || item.country_code === 'CH' ? 'High' : 'Moderate',
      popularity: 88,
      description: item.formatted || `Explore ${item.city || query}, ${item.country || ''}.`,
      image: getCityPhoto(item.city || item.name || query),
      placeId: item.place_id
    }));

    // Deduplicate by name
    const uniqueCities = Array.from(new Map(results.map((c) => [c.name.toLowerCase(), c])).values());
    cache.cities.set(cacheKey, uniqueCities);
    return uniqueCities;
  } catch (error) {
    console.warn('Geoapify Geocode API fetch failed:', error);
    return [];
  }
}

/**
 * 2. Search Places / Activities using Geoapify Places API
 */
export async function searchPlaces({ lat, lon, category = 'tourism', limit = 12 }) {
  if (!lat || !lon) return [];

  const categoryMap = {
    Sightseeing: 'tourism.sights,tourism.attraction',
    Culture: 'entertainment.museum,heritage',
    'Food & Dining': 'catering.restaurant,catering.cafe',
    Adventure: 'leisure.park,sport',
    Nature: 'leisure.park,natural',
    All: 'tourism,entertainment,catering,leisure'
  };

  const geoCategory = categoryMap[category] || 'tourism,entertainment';
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)},${geoCategory}`;

  if (cache.places.has(cacheKey)) {
    return cache.places.get(cacheKey);
  }

  try {
    const url = `${BASE_PLACES_URL}?categories=${geoCategory}&filter=circle:${lon},${lat},15000&limit=${limit}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Geoapify Places error: ${response.statusText}`);

    const data = await response.json();
    const places = (data.features || []).map((feat, idx) => {
      const props = feat.properties || {};
      return {
        id: props.place_id || `place-${props.lat}-${props.lon}-${idx}`,
        title: props.name || props.formatted?.split(',')[0] || 'Local Attraction',
        category: category !== 'All' ? category : 'Sightseeing',
        time: `${9 + (idx % 6)}:00 ${idx % 2 === 0 ? 'AM' : 'PM'}`,
        duration: `${1 + (idx % 3)} hours`,
        cost: 20 + (idx % 4) * 15,
        lat: props.lat,
        lon: props.lon,
        address: props.formatted || props.address_line2 || '',
        description: props.formatted || `Featured place in ${props.city || 'destination'}.`,
        placeId: props.place_id
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
 * 3. Calculate Route Distance & Time using Geoapify Routing API
 */
export async function calculateRoute(waypoints = []) {
  if (waypoints.length < 2) return null;

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
