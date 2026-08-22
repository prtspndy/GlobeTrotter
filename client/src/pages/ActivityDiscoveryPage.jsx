import React, { useState } from 'react';
import { MOCK_CITIES } from '../data/mockData';

export default function ActivityDiscoveryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allActivities = MOCK_CITIES.flatMap((city) =>
    (city.activities || []).map((act) => ({
      ...act,
      cityName: city.name,
      country: city.country
    }))
  );

  const categories = ['All', 'Sightseeing', 'Food & Dining', 'Culture', 'Adventure', 'Nature'];

  const filteredActivities = allActivities.filter((act) => {
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesQuery = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.cityName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Header */}
      <section className="bg-surface-container-low border-b border-outline-variant py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-4">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block">
            Activity Catalog
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
            Make your trip memorable.
          </h1>
          <p className="text-sm text-secondary max-w-xl">
            Discover curated experiences worth adding to your itinerary. From ancient monuments to local culinary tours.
          </p>

          {/* Search Field */}
          <div className="relative max-w-xl pt-2">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences, tours or cities..."
              className="w-full bg-surface border border-outline-variant rounded-sm py-3 pl-10 pr-4 text-xs text-on-surface focus:outline-none focus:border-primary shadow-paper"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition ${
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

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
        
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <h2 className="font-serif text-2xl font-bold text-on-surface">Explore Experiences</h2>
          <span className="text-xs font-mono text-secondary">{filteredActivities.length} items</span>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act, idx) => (
            <div key={act.id || idx} className="group bg-surface border border-outline-variant rounded-sm p-6 shadow-paper hover:border-primary transition flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-0.5 bg-surface-container border border-outline-variant rounded-sm text-[10px] uppercase font-semibold text-primary">
                    {act.category || 'Sightseeing'}
                  </span>
                  <span className="font-mono text-xs font-bold text-on-surface">${act.cost}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-on-surface group-hover:text-primary transition">{act.title}</h3>
                <p className="text-xs text-secondary leading-relaxed mt-2 line-clamp-3">{act.description}</p>
              </div>

              <div className="pt-4 border-t border-outline-variant/40 flex justify-between items-center text-xs font-mono text-secondary">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {act.cityName}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {act.duration}</span>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
