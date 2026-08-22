import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CITIES } from '../data/mockData';

export default function CityDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCost, setSelectedCost] = useState('All');

  const filteredCities = MOCK_CITIES.filter((city) => {
    const matchesQuery = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCost = selectedCost === 'All' || city.costIndex.toLowerCase() === selectedCost.toLowerCase();
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;

    return matchesQuery && matchesCost && matchesRegion;
  });

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Hero Header Section */}
      <section className="bg-surface-container-low border-b border-outline-variant py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop space-y-4">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block">
            Destination Catalog
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
            Where do you want to go?
          </h1>
          <p className="text-base text-secondary font-light">
            Discover destinations across Europe, Asia, America, and Middle East.
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
              placeholder="Search cities, countries or regions..."
              className="w-full bg-surface border border-outline-variant rounded-sm py-4 pl-12 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary shadow-paper"
            />
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-xs">
            <span className="text-secondary font-semibold uppercase tracking-wider text-[10px]">Popular:</span>
            {['Rome', 'Paris', 'Tokyo', 'Dubai', 'Kyoto'].map((cityName) => (
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
              <option value="Low">Low Cost</option>
              <option value="Moderate">Moderate Cost</option>
              <option value="High">High Cost</option>
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-surface border border-outline-variant rounded-sm text-xs px-3 py-1.5 text-on-surface"
            >
              <option value="All">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>

          <span className="text-xs font-mono text-secondary">
            {filteredCities.length} cities found
          </span>
        </div>

        {/* Cities Grid */}
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
                    {city.country}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                    Popularity: {city.popularity}%
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl font-bold text-on-surface">{city.name}</h3>
                    <span className="text-xs font-mono font-semibold text-primary capitalize">{city.costIndex} Cost</span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                    {city.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-outline-variant/40 flex justify-between items-center mt-4 pt-4">
                <span className="text-xs font-mono text-secondary">{city.activities?.length || 0} Curated Activities</span>
                <Link
                  to="/discover/activities"
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition"
                >
                  Explore &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
