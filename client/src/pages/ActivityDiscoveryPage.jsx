import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_CITIES } from '../data/mockData';
import { searchPlaces } from '../services/geoapifyService';
import { useUserLocation } from '../hooks/useUserLocation';
import { MapPin, Navigation, Search, Loader2, Sparkles } from 'lucide-react';

export default function ActivityDiscoveryPage() {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'Rome';
  const initialLat = parseFloat(searchParams.get('lat')) || 41.9028;
  const initialLon = parseFloat(searchParams.get('lon')) || 12.4964;

  const { location, detectLocation, loading: locLoading, error: locError } = useUserLocation();

  const [activeCityName, setActiveCityName] = useState(initialCity);
  const [activeLat, setActiveLat] = useState(initialLat);
  const [activeLon, setActiveLon] = useState(initialLon);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApiResults, setIsApiResults] = useState(false);

  const categories = ['All', 'Sightseeing', 'Food & Dining', 'Culture', 'Adventure', 'Nature'];

  // Update coordinates when user location is detected
  useEffect(() => {
    if (location) {
      setActiveCityName(location.city);
      setActiveLat(location.lat);
      setActiveLon(location.lon);
    }
  }, [location]);

  // Fetch dynamic places from Geoapify Places API for activeLat & activeLon
  useEffect(() => {
    let isMounted = true;
    async function loadPlaces() {
      setLoading(true);
      const apiPlaces = await searchPlaces({
        lat: activeLat,
        lon: activeLon,
        category: selectedCategory,
        limit: 15
      });

      if (isMounted) {
        if (apiPlaces && apiPlaces.length > 0) {
          setActivities(apiPlaces);
          setIsApiResults(true);
        } else {
          // Fallback mock activities if coordinates API returns no items
          const mock = MOCK_CITIES.flatMap((city) =>
            (city.activities || []).map((act) => ({
              ...act,
              cityName: city.name,
              country: city.country
            }))
          );
          setActivities(mock);
          setIsApiResults(false);
        }
        setLoading(false);
      }
    }

    loadPlaces();
    return () => { isMounted = false; };
  }, [activeLat, activeLon, selectedCategory]);

  const filteredActivities = activities.filter((act) => {
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesQuery = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Header */}
      <section className="bg-surface-container-low border-b border-outline-variant py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-4">
          
          {/* Live Location Tag & Permission Trigger Button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-xl text-primary text-xs font-mono font-bold">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{activeCityName.toUpperCase()} &bull; GEOAPIFY LIVE PLACES</span>
            </div>

            <button
              onClick={detectLocation}
              disabled={locLoading}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {locLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              <span>{locLoading ? 'Detecting Location...' : 'Detect My Live Location'}</span>
            </button>
          </div>

          {locError && (
            <div className="p-3 bg-error-container/40 border border-error/40 text-on-error-container text-xs font-medium rounded-xl">
              {locError}
            </div>
          )}

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
            Explore Places in {activeCityName}
          </h1>
          <p className="text-sm text-secondary max-w-xl">
            Real-time points of interest, tourist attractions, museums, and restaurants fetched dynamically for {activeCityName}.
          </p>

          {/* Search Field */}
          <div className="relative max-w-xl pt-2">
            <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter places by title..."
              className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-10 pr-4 text-xs text-on-surface focus:outline-none focus:border-primary shadow-paper"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface border border-outline-variant text-secondary hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-6">
        
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <h2 className="font-serif text-2xl font-bold text-on-surface">
            Points of Interest & Attractions
          </h2>
          <span className="text-xs font-mono font-semibold text-secondary">
            {isApiResults ? 'Geoapify Real-Time API' : 'Curated Catalog'} &bull; {filteredActivities.length} items
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            <p className="text-xs text-secondary font-mono">Fetching points of interest for {activeCityName}...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-low border border-dashed border-outline-variant rounded-2xl p-6">
            <p className="text-xs text-secondary">No places found matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-paper hover:border-primary transition flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden bg-on-surface">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-on-surface border border-outline-variant rounded-lg">
                    {act.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white font-mono text-xs font-bold px-2.5 py-1 rounded-lg">
                    ${act.cost}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-on-surface">
                      {act.title}
                    </h3>
                    <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/60 flex justify-between items-center text-xs font-mono text-secondary">
                    <span>Est. Duration: {act.duration}</span>
                    <span className="text-primary font-semibold uppercase text-[10px] tracking-wider">
                      {activeCityName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
