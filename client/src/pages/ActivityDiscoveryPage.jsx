import React, { useState } from 'react';
import { Search, Clock, DollarSign, MapPin, Plus } from 'lucide-react';
import { MOCK_ACTIVITIES, MOCK_CITIES } from '../data/mockData';
import { useTrip } from '../context/TripContext';

export default function ActivityDiscoveryPage() {
  const { trips, addActivityToDay } = useTrip();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filteredActivities = MOCK_ACTIVITIES.filter(act => {
    const matchesSearch = act.name.toLowerCase().includes(search.toLowerCase()) || 
                          act.cityName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || act.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-outline-variant/60 pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
          Activity Catalog
        </span>
        <h1 className="font-serif text-3xl font-bold text-on-surface">
          Discover Curated Travel Activities
        </h1>
        <p className="text-xs text-on-surface-variant">
          Explore sightseeing tours, Michelin street food tastings, and museum access to schedule into your daily itineraries.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'sightseeing', 'culture', 'food'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm border transition ${
                categoryFilter === cat 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-surface border-outline/40 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities or cities..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
          />
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredActivities.map(act => (
          <div key={act.id} className="bg-surface border border-outline/40 shadow-paper overflow-hidden group hover:border-primary transition flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={act.image} 
                  alt={act.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-none"
                />
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                  {act.cityName}
                </div>
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                  ${act.cost}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-[11px] text-outline font-semibold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{act.durationMinutes} minutes</span>
                  <span>&bull;</span>
                  <span>{act.category}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-on-surface">
                  {act.name}
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/60 flex items-center justify-between">
              <span className="text-[11px] text-outline flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-outline" />
                <span className="truncate max-w-[150px]">{act.locationName}</span>
              </span>

              <button
                onClick={() => setSelectedActivity(act)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface border border-outline/40 p-6 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-on-surface">
              Schedule {selectedActivity.name}
            </h3>
            <p className="text-xs text-on-surface-variant">
              Select trip stop to append this activity slot:
            </p>

            <div className="space-y-2">
              {trips.map(t => (
                <div key={t.id} className="p-3 border border-outline/30 space-y-2">
                  <h4 className="font-serif text-sm font-bold text-on-surface">{t.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.stops?.map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          addActivityToDay(t.id, s.id, 1, selectedActivity);
                          setSelectedActivity(null);
                        }}
                        className="px-2.5 py-1 text-[10px] uppercase font-semibold bg-primary/10 text-primary border border-primary/30 rounded-sm hover:bg-primary hover:text-white transition"
                      >
                        + Add to {s.cityName} (Day 1)
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 text-xs uppercase font-semibold text-on-surface-variant"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
