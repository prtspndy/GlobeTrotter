import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CITIES } from '../data/mockData';
import { searchCities } from '../services/geoapifyService';

export default function CityDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCost, setSelectedCost] = useState('All');
  const [cities, setCities] = useState(MOCK_CITIES);
  const [loading, setLoading] = useState(false);
  const [isApiResults, setIsApiResults] = useState(false);

  // Debounced dynamic search from Geoapify API
  useEffect(() => {
    let isMounted = true;

    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      if (isApiResults) {
        setCities(MOCK_CITIES);
        setIsApiResults(false);
      }
      return;
    }

    const timer = setTimeout(async () => {
      if (!isMounted) return;
      setLoading(true);
      const apiResults = await searchCities(searchQuery);

      if (isMounted) {
        if (apiResults && apiResults.length > 0) {
          setCities(apiResults);
          setIsApiResults(true);
        } else {
          const fallback = MOCK_CITIES.filter((c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.country.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setCities(fallback);
          setIsApiResults(false);
        }
        setLoading(false);
      }
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, isApiResults]);

  const filteredCities = cities.filter((city) => {
    const matchesCost = selectedCost === 'All' || (city.costIndex && city.costIndex.toLowerCase() === selectedCost.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    return matchesCost && matchesRegion;
  });

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Hero Header Section */}
      <section className="bg-surface-container-low border-b border-outline-variant py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop space-y-4">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block">
            Real-Time Destination Catalog &bull; Geoapify Powered
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
            Where do you want to go?
          </h1>
          <p className="text-base text-secondary font-light">
            Search any city globally with live geocoding coordinates.
          </p>

          {/* Big Search Input */}
          <div className="relative max-w-xl mx-auto pt-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-2xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any city or country (e.g. Berlin, Tokyo, Rome)..."
              className="w-full bg-surface border border-outline-variant rounded-sm py-4 pl-12 pr-10 text-sm text-on-surface focus:outline-none focus:border-primary shadow-paper"
            />
            {loading && (
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary animate-spin text-xl">
                progress_activity
              </span>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-xs">
            <span className="text-secondary font-semibold uppercase tracking-wider text-[10px]">Popular:</span>
            {['Jaipur', 'Varanasi', 'Goa', 'Leh', 'Munnar', 'Mumbai', 'Delhi', 'Agra'].map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSearchQuery(cityName)}
                className="px-3 py-1 bg-surface border border-outline-variant rounded-sm hover:border-primary text-on-surface transition"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-8">
        
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Filters:</span>
            
            <select
              value={selectedCost}
              onChange={(e) => setSelectedCost(e.target.value)}
              className="bg-surface border border-outline-variant rounded-sm text-xs px-3 py-1.5 text-on-surface"
            >
              <option value="All">All Costs</option>
              <option value="budget">Budget</option>
              <option value="moderate">Moderate Cost</option>
              <option value="luxury">Luxury</option>
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-surface border border-outline-variant rounded-sm text-xs px-3 py-1.5 text-on-surface"
            >
              <option value="All">All Regions</option>
              <option value="North India">North India</option>
              <option value="South India">South India</option>
              <option value="West India">West India</option>
              <option value="East India">East India</option>
              <option value="Himalayas">Himalayas</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            {isApiResults && <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/30 rounded-sm">Geoapify Live</span>}
            <span>{filteredCities.length} cities found</span>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-surface-container-low border border-outline-variant rounded-sm animate-pulse" />
            ))}
          </div>
        )}

        {/* Cities Grid */}
        {!loading && filteredCities.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-outline-variant p-8 space-y-4">
            <span className="material-symbols-outlined text-secondary text-5xl">location_off</span>
            <h3 className="font-serif text-2xl font-bold text-on-surface">No Cities Found</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              No matching destinations found for "{searchQuery}". Try searching for another city name.
            </p>
          </div>
        ) : (
          !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCities.map((city) => (
                <div key={city.id} className="group bg-surface border border-outline-variant rounded-sm overflow-hidden shadow-paper hover:border-primary transition flex flex-col justify-between">
                  <div>
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface border border-outline-variant rounded-sm">
                        {city.country || 'Global'}
                      </div>
                      {city.lat && (
                        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white px-2 py-0.5 text-[10px] font-mono rounded-sm">
                          {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-serif text-2xl font-bold text-on-surface">{city.name}</h3>
                        <span className="text-xs font-mono font-semibold text-primary capitalize">{city.costIndex || 'Moderate'} Cost</span>
                      </div>

                      <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                        {city.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-outline-variant/40 flex justify-between items-center mt-4 pt-4">
                    <span className="text-xs font-mono text-secondary">{city.region || 'Global'}</span>
                    <Link
                      to={`/discover/activities?city=${encodeURIComponent(city.name)}&lat=${city.lat || ''}&lon=${city.lon || ''}`}
                      className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition"
                    >
                      Explore Places &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </main>
    </div>
  );
}
