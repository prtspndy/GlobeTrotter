import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CITIES, MOCK_ACTIVITIES } from '../data/mockData';
import { searchGeocodeCity } from '../services/geoapifyService';
import { MapPin, Compass, Plus, Eye, Check, X, Sparkles, Building, Loader2 } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function CityDiscoveryPage() {
  const { trips, addCityStop } = useTrip();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCost, setSelectedCost] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  const [cities, setCities] = useState(MOCK_CITIES);
  const [loading, setLoading] = useState(true);
  const [isApiResults, setIsApiResults] = useState(false);

  // Initial mount short loading effect (450ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Selected City Modal State for "Jovalayak Sthal" (Tourist Places)
  const [selectedCityModal, setSelectedCityModal] = useState(null);
  const [addedCitySuccess, setAddedCitySuccess] = useState('');

  // Custom Add City Modal State
  const [showAddCityModal, setShowAddCityModal] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCityState, setNewCityState] = useState('');
  const [newCityDescription, setNewCityDescription] = useState('');
  const [newCityImage, setNewCityImage] = useState('');

  // Live Geocoding API Debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setCities(MOCK_CITIES);
      setIsApiResults(false);
      return;
    }

    let isMounted = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      const apiCities = await searchGeocodeCity(searchQuery);

      if (isMounted) {
        if (apiCities && apiCities.length > 0) {
          setCities(apiCities);
          setIsApiResults(true);
        } else {
          const localFiltered = MOCK_CITIES.filter((c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.country.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setCities(localFiltered);
          setIsApiResults(false);
        }
        setLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [searchQuery]);

  const filteredCities = cities.filter((city) => {
    const matchesCost = selectedCost === 'All' || (city.costIndex && city.costIndex.toLowerCase() === selectedCost.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    return matchesCost && matchesRegion;
  });

  const getCityAttractions = (cityName) => {
    const lower = cityName.toLowerCase();
    const matches = MOCK_ACTIVITIES.filter((act) =>
      act.cityName?.toLowerCase().includes(lower) || lower.includes(act.cityName?.toLowerCase() || '')
    );
    if (matches.length > 0) return matches;

    // Fallback generic attractions
    return [
      { id: 'gen-1', name: `${cityName} Heritage Walk & Sightseeing`, category: 'Sightseeing', cost: 300, duration: '2.5 hrs', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80' },
      { id: 'gen-2', name: `${cityName} Famous Food & Culinary Tour`, category: 'Food & Dining', cost: 500, duration: '3 hrs', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80' },
      { id: 'gen-3', name: `${cityName} Cultural Monument Tour`, category: 'Culture', cost: 400, duration: '2 hrs', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80' }
    ];
  };

  const handleQuickAddCityToTrip = (city) => {
    if (trips.length > 0) {
      const targetTrip = trips[0];
      addCityStop(targetTrip.id, {
        cityName: city.name,
        country: city.country || 'India',
        image: city.image
      });
      setAddedCitySuccess(`Added ${city.name} to "${targetTrip.title}"!`);
      setTimeout(() => setAddedCitySuccess(''), 3000);
    }
  };

  const handleCreateNewCustomCity = (e) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    const createdCityObj = {
      id: `custom-city-${Date.now()}`,
      name: newCityName.trim(),
      state: newCityState.trim() || 'India',
      country: 'India',
      region: 'North India',
      description: newCityDescription.trim() || `Beautiful destination ${newCityName.trim()} added to travel network.`,
      image: newCityImage.trim() || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      costIndex: 'moderate',
      popularity: 90,
      dailyBudgetINR: 3000
    };

    setCities([createdCityObj, ...cities]);
    setAddedCitySuccess(`Successfully registered new city "${newCityName.trim()}"!`);
    setTimeout(() => setAddedCitySuccess(''), 3500);

    setNewCityName('');
    setNewCityState('');
    setNewCityDescription('');
    setNewCityImage('');
    setShowAddCityModal(false);
  };

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Hero Header Section */}
      <section className="bg-surface-container-low border-b border-outline-variant py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop space-y-4">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block">
            EXPLORE DESTINATIONS & TOURIST ATTRACTIONS (Jovalayak Sthal)
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
            Where do you want to travel next?
          </h1>
          <p className="text-sm text-secondary font-light">
            Search any Indian or global city to instantly discover famous tourist places, attractions, and activities.
          </p>

          {/* Search Bar & Custom Add City Button */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-2xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any city (e.g. Jaipur, Ahmedabad, Surat, Varanasi)..."
                className="w-full bg-surface border border-outline-variant rounded-xl py-3.5 pl-12 pr-10 text-sm text-on-surface focus:outline-none focus:border-primary shadow-paper"
              />
              {loading && (
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary animate-spin text-xl">
                  progress_activity
                </span>
              )}
            </div>

            <button
              onClick={() => setShowAddCityModal(true)}
              className="px-5 py-3.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center justify-center gap-1.5 shadow-paper cursor-pointer flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom City</span>
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-xs">
            <span className="text-secondary font-semibold uppercase tracking-wider text-[10px]">Popular Cities:</span>
            {['Jaipur', 'Varanasi', 'Goa', 'Leh', 'Munnar', 'Mumbai', 'Delhi', 'Agra'].map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSearchQuery(cityName)}
                className="px-3 py-1 bg-surface border border-outline-variant rounded-lg hover:border-primary text-on-surface transition cursor-pointer"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-8">
        
        {/* Added Toast Notification */}
        {addedCitySuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 shadow-paper">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{addedCitySuccess}</span>
          </div>
        )}

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Filters:</span>
            
            <select
              value={selectedCost}
              onChange={(e) => setSelectedCost(e.target.value)}
              className="bg-surface border border-outline-variant rounded-xl text-xs px-3 py-2 text-on-surface outline-none"
            >
              <option value="All">All Costs</option>
              <option value="budget">Budget</option>
              <option value="moderate">Moderate Cost</option>
              <option value="luxury">Luxury</option>
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-surface border border-outline-variant rounded-xl text-xs px-3 py-2 text-on-surface outline-none"
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
            <span>{filteredCities.length} Cities Found</span>
          </div>
        </div>

        {/* Cities Grid & Loading States */}
        {loading ? (
          <div className="space-y-8">
            <div className="text-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
              <p className="text-xs font-mono text-secondary tracking-wider uppercase">
                Loading City Destinations & Tourist Places...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-surface border border-outline-variant/60 rounded-2xl h-80 animate-pulse p-4 space-y-4">
                  <div className="h-44 bg-surface-container-high rounded-xl w-full" />
                  <div className="h-6 bg-surface-container-high rounded-md w-3/4" />
                  <div className="h-4 bg-surface-container-high rounded-md w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-outline-variant p-8 rounded-2xl space-y-4">
            <span className="material-symbols-outlined text-secondary text-5xl">location_off</span>
            <h3 className="font-serif text-2xl font-bold text-on-surface">No Cities Found</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              No matching destinations found for "{searchQuery}". Try searching or click "+ Add Custom City" to register it!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCities.map((city) => (
                <div key={city.id || city.name} className="group bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-paper hover:border-primary transition flex flex-col justify-between">
                  <div>
                    <div className="h-56 relative overflow-hidden cursor-pointer" onClick={() => setSelectedCityModal(city)}>
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface border border-outline-variant rounded-md">
                        {city.state || city.country || 'India'}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white px-3 py-1 text-[10px] font-mono rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>View Tourist Places</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-serif text-2xl font-bold text-on-surface">{city.name}</h3>
                        <span className="text-xs font-mono font-semibold text-primary capitalize">
                          {city.dailyBudgetINR ? `₹${city.dailyBudgetINR}/day` : (city.costIndex || 'Moderate')}
                        </span>
                      </div>

                      <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                        {city.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-6 pt-0 border-t border-outline-variant/40 flex justify-between items-center mt-4 pt-4">
                    <button
                      onClick={() => setSelectedCityModal(city)}
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Jovalayak Sthal</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQuickAddCityToTrip(city)}
                        className="px-3 py-2 bg-surface-container-low border border-outline-variant hover:border-primary text-on-surface text-xs font-semibold rounded-xl transition flex items-center gap-1 cursor-pointer"
                        title="Add Stop to My Trip"
                      >
                        <Plus className="w-3.5 h-3.5 text-primary" />
                        <span>Add Stop</span>
                      </button>

                      <Link
                        to={`/discover/activities?city=${encodeURIComponent(city.name)}`}
                        className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition"
                      >
                        Explore &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}

        {/* Tourist Places / Jovalayak Sthal Modal */}
        {selectedCityModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="relative h-44 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
                <img src={selectedCityModal.image} alt={selectedCityModal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedCityModal(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition text-lg"
                >
                  &times;
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed block">
                    FAMOUS TOURIST PLACES (JOVALAYAK STHAL)
                  </span>
                  <h3 className="font-serif text-3xl font-bold">{selectedCityModal.name}, {selectedCityModal.state || selectedCityModal.country}</h3>
                </div>
              </div>

              {/* City Summary */}
              <p className="text-xs text-secondary leading-relaxed">
                "{selectedCityModal.description}"
              </p>

              {/* Tourist Attractions List */}
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold text-on-surface border-b border-outline-variant pb-2">
                  Top Attractions & Experiences ({getCityAttractions(selectedCityModal.name).length})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getCityAttractions(selectedCityModal.name).map((place, pIdx) => (
                    <div key={pIdx} className="bg-surface-container-low border border-outline-variant rounded-xl p-3 flex gap-3 items-center">
                      <img src={place.image || selectedCityModal.image} alt={place.name || place.title} className="w-14 h-14 rounded-lg object-cover border border-outline-variant" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-on-surface truncate">{place.name || place.title}</h5>
                        <span className="text-[10px] font-mono text-primary block">{place.category} &bull; ₹{place.cost}</span>
                        <span className="text-[10px] text-secondary block">{place.duration || '2 hours'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                <button
                  onClick={() => {
                    handleQuickAddCityToTrip(selectedCityModal);
                    setSelectedCityModal(null);
                  }}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {selectedCityModal.name} to My Trip</span>
                </button>

                <Link
                  to={`/discover/activities?city=${encodeURIComponent(selectedCityModal.name)}`}
                  onClick={() => setSelectedCityModal(null)}
                  className="px-5 py-2.5 bg-surface-container-low border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:border-primary transition"
                >
                  Explore All Activities &rarr;
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Custom Add City Modal */}
        {showAddCityModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
              
              <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                <h3 className="font-serif text-xl font-bold text-on-surface flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  <span>Add New Custom City</span>
                </h3>
                <button onClick={() => setShowAddCityModal(false)} className="text-secondary hover:text-on-surface text-xl cursor-pointer">
                  &times;
                </button>
              </div>

              <form onSubmit={handleCreateNewCustomCity} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase mb-1">
                    City Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    placeholder="e.g. Surat, Ahmedabad, Indore, Ujjain"
                    required
                    className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-xs text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={newCityState}
                    onChange={(e) => setNewCityState(e.target.value)}
                    placeholder="e.g. Gujarat, Madhya Pradesh"
                    className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-xs text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase mb-1">
                    Description & Travel Highlights
                  </label>
                  <textarea
                    rows="3"
                    value={newCityDescription}
                    onChange={(e) => setNewCityDescription(e.target.value)}
                    placeholder="Describe heritage landmarks, street food, or travel culture..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 text-xs text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newCityImage}
                    onChange={(e) => setNewCityImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-xs text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                  <button
                    type="button"
                    onClick={() => setShowAddCityModal(false)}
                    className="px-4 py-2 bg-surface-container-low border border-outline-variant text-xs font-semibold rounded-xl text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-container transition"
                  >
                    Save & Register City
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
