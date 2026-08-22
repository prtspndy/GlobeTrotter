import React, { useState } from 'react';
import { Search, MapPin, Compass, Plus, Filter, Check } from 'lucide-react';
import { MOCK_CITIES } from '../data/mockData';
import { useTrip } from '../context/TripContext';

export default function CityDiscoveryPage() {
  const { trips, addCityStop } = useTrip();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCityForModal, setSelectedCityForModal] = useState(null);

  const filteredCities = MOCK_CITIES.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) || 
                          city.country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || city.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-outline-variant/60 pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
          Destination Explorer
        </span>
        <h1 className="font-serif text-3xl font-bold text-on-surface">
          Discover World-Class Cities
        </h1>
        <p className="text-xs text-on-surface-variant">
          Search cataloged destinations, filter by cost index or region, and append cities directly to your travel trips.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        
        {/* Region Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {['all', 'Europe', 'Asia'].map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm border transition ${
                selectedRegion === region 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-surface border-outline/40 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city or country..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCities.map(city => (
          <div key={city.id} className="bg-surface border border-outline/40 shadow-paper overflow-hidden group hover:border-primary transition flex flex-col justify-between">
            <div>
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-none"
                />
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                  {city.country}
                </div>
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                  {city.costIndex} Cost
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl font-bold text-on-surface">
                    {city.name}
                  </h3>
                  <span className="text-xs text-outline font-medium">
                    Pop: {city.popularity}%
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {city.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/60 flex items-center justify-between">
              <span className="text-[11px] uppercase font-semibold text-outline">
                {city.region} Region
              </span>
              <button
                onClick={() => setSelectedCityForModal(city)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Trip</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add City to Trip Selector Modal */}
      {selectedCityForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface border border-outline/40 p-6 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-on-surface">
              Add {selectedCityForModal.name} to Trip
            </h3>
            <p className="text-xs text-on-surface-variant">
              Select which active trip to append {selectedCityForModal.name} to:
            </p>

            <div className="space-y-2">
              {trips.map(t => (
                <div
                  key={t.id}
                  onClick={() => { addCityStop(t.id, selectedCityForModal.id); setSelectedCityForModal(null); }}
                  className="p-3 border border-outline/30 hover:border-primary cursor-pointer transition flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-serif text-sm font-bold text-on-surface">{t.title}</h4>
                    <span className="text-[11px] text-outline">{t.stops?.length || 0} Cities Scheduled</span>
                  </div>
                  <span className="text-xs uppercase font-bold text-primary">+ Append</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCityForModal(null)}
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
