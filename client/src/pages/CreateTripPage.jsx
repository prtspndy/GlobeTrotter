import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES, MOCK_ACTIVITIES } from '../data/mockData';
import { Plus, Check, Trash2, MapPin, Sparkles, Compass } from 'lucide-react';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { createTrip } = useTrip();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('2026-06-12');
  const [endDate, setEndDate] = useState('2026-06-24');
  const [description, setDescription] = useState('');
  const [totalBudget, setTotalBudget] = useState(35000);
  const [visibility, setVisibility] = useState('public');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'
  );

  // Multi-City & Multi-Attraction Selection State
  const [selectedCities, setSelectedCities] = useState(['Jaipur', 'Varanasi']);
  const [customCitiesList, setCustomCitiesList] = useState([]);
  const [customCityInput, setCustomCityInput] = useState('');
  
  const [selectedAttractions, setSelectedAttractions] = useState([
    'Amber Fort & Palace Tour',
    'Morning Ganga Aarti & Boat Ride'
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allAvailableCities = [...MOCK_CITIES, ...customCitiesList];

  const handleAddCustomCity = () => {
    if (!customCityInput.trim()) return;
    const formattedName = customCityInput.trim();
    if (!allAvailableCities.some((c) => c.name.toLowerCase() === formattedName.toLowerCase())) {
      const newCityObj = {
        id: `custom-city-${Date.now()}`,
        name: formattedName,
        country: 'India',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
        description: `Explorer city ${formattedName} added to travel itinerary.`,
        activities: [
          {
            id: `act-${Date.now()}-1`,
            title: `${formattedName} Heritage & City Discovery Tour`,
            category: 'Sightseeing',
            cost: 400,
            duration: '2.5 hrs',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
            cityName: formattedName
          }
        ]
      };

      setCustomCitiesList([...customCitiesList, newCityObj]);
      setSelectedCities([...selectedCities, formattedName]);
      setSelectedAttractions([...selectedAttractions, newCityObj.activities[0].title]);
    } else if (!selectedCities.includes(formattedName)) {
      setSelectedCities([...selectedCities, formattedName]);
    }
    setCustomCityInput('');
  };

  const sampleCovers = [
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
  ];

  // Helper to toggle a city selection
  const toggleCitySelection = (cityName) => {
    if (selectedCities.includes(cityName)) {
      if (selectedCities.length === 1) return; // Must keep at least 1 city
      setSelectedCities(selectedCities.filter((c) => c !== cityName));
    } else {
      setSelectedCities([...selectedCities, cityName]);
    }
  };

  // Helper to toggle an attraction (Jovalayak Sthal) selection
  const toggleAttractionSelection = (attractionTitle) => {
    if (selectedAttractions.includes(attractionTitle)) {
      setSelectedAttractions(selectedAttractions.filter((a) => a !== attractionTitle));
    } else {
      setSelectedAttractions([...selectedAttractions, attractionTitle]);
    }
  };

  // Get available tourist places for the selected cities
  const availableAttractions = MOCK_ACTIVITIES.filter((act) =>
    selectedCities.some((c) => c.toLowerCase() === act.cityName?.toLowerCase())
  );

  const handleNext = () => {
    setError('');
    if (step === 1 && !title.trim()) {
      return setError('Please enter a trip name before continuing.');
    }
    if (step === 2 && selectedCities.length === 0) {
      return setError('Please select at least one city destination.');
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrev = () => {
    setError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Build initial stops array from all selected cities
      const initialStops = selectedCities.map((cityName, idx) => {
        const cityData = allAvailableCities.find((c) => c.name === cityName) || {
          name: cityName,
          country: 'India',
          image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80'
        };
        
        // Filter chosen attractions for this city
        const cityChosenActs = MOCK_ACTIVITIES.filter((act) =>
          act.cityName?.toLowerCase() === cityName.toLowerCase() &&
          selectedAttractions.includes(act.name || act.title)
        );

        return {
          id: `stop-${Date.now()}-${idx + 1}`,
          cityName: cityData.name,
          country: cityData.country || 'India',
          image: cityData.image,
          arrivalDate: startDate,
          departureDate: endDate,
          activities: cityChosenActs.length > 0 ? cityChosenActs : (cityData.activities || [])
        };
      });

      const newTrip = await createTrip({
        title,
        startDate,
        endDate,
        description: description || `Multi-city excursion exploring ${selectedCities.join(', ')}.`,
        totalBudget: Number(totalBudget) || 35000,
        coverImage,
        visibility,
        stops: initialStops
      });

      navigate(`/trips/${newTrip.id || newTrip._id}`);
    } catch (err) {
      setError(err.message || 'Failed to create trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen pb-20">
      
      {/* Step Header Bar */}
      <header className="w-full flex items-center justify-between px-margin-mobile md:px-margin-desktop py-6 border-b border-outline-variant bg-surface sticky top-0 z-40">
        <Link to="/trips" className="flex items-center gap-3 hover:opacity-70 transition">
          <span className="material-symbols-outlined text-secondary">arrow_back</span>
          <span className="font-body-md font-medium text-secondary">Back to My Trips</span>
        </Link>

        {/* Step Indicators */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={`w-2.5 h-2.5 rounded-full transition ${
                s <= step ? 'bg-primary' : 'bg-surface-container-high border border-outline-variant'
              }`}
            />
          ))}
          <span className="font-mono text-xs text-secondary ml-2 font-semibold">0{step} / 04</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Wizard Column (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-semibold mb-1">
                Guided Trip Architect &bull; Step {step} of 4
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
                {step === 1 && "What's the name of your journey?"}
                {step === 2 && "Select Cities & Tourist Places (Jovalayak Sthal)"}
                {step === 3 && "Set your budget & privacy controls"}
                {step === 4 && "Select artwork & finalize excursion"}
              </h1>
            </div>

            {error && (
              <div className="p-4 bg-error-container/60 border border-error/40 text-on-error-container text-xs rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Intent & Title */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                      Trip Name / Masthead Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Royal Rajasthan & Spiritual Ganges Tour"
                      required
                      className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-2xl font-serif transition-colors placeholder-secondary/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                      Trip Description / Travel Notes
                    </label>
                    <textarea
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your trip aspirations, lodging ideas, or travel highlights..."
                      className="w-full bg-transparent border border-outline-variant p-3 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary placeholder-secondary/40"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Dates, Multi-City & Tourist Places (Jovalayak Sthal) Selection */}
              {step === 2 && (
                <div className="space-y-8">
                  {/* Travel Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
                      />
                    </div>
                  </div>

                  {/* Multi-City Selection & Custom City Add Input */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                        1. Select Cities to Visit ({selectedCities.length} Selected)
                      </label>
                      <span className="text-[11px] text-primary font-semibold">Click chips to add/remove cities</span>
                    </div>

                    {/* Add Custom City Input */}
                    <div className="flex gap-2 pb-2">
                      <input
                        type="text"
                        value={customCityInput}
                        onChange={(e) => setCustomCityInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomCity();
                          }
                        }}
                        placeholder="Type any new city (e.g. Ahmedabad, Surat, Indore)..."
                        className="flex-1 h-10 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-xs text-on-surface outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomCity}
                        className="px-4 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-container transition flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add City</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                      {allAvailableCities.map((c) => {
                        const isSelected = selectedCities.includes(c.name);
                        return (
                          <button
                            key={c.id || c.name}
                            type="button"
                            onClick={() => toggleCitySelection(c.name)}
                            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-surface-container-low border-outline-variant text-on-surface hover:border-primary'
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-secondary" />}
                            <span>{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Multi-Tourist Places (Jovalayak Sthal) Selection */}
                  <div className="space-y-3 pt-4 border-t border-outline-variant">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>2. Select Tourist Places (Jovalayak Sthal) ({selectedAttractions.length} Selected)</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                      {availableAttractions.map((act) => {
                        const placeTitle = act.name || act.title;
                        const isSelected = selectedAttractions.includes(placeTitle);
                        return (
                          <div
                            key={act.id}
                            onClick={() => toggleAttractionSelection(placeTitle)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'bg-primary/10 border-primary shadow-sm'
                                : 'bg-surface-container-low border-outline-variant/60 hover:border-primary/50'
                            }`}
                          >
                            <img src={act.image} alt={placeTitle} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-on-surface truncate">{placeTitle}</h4>
                              <span className="text-[10px] text-primary font-mono block">{act.cityName} &bull; ₹{act.cost}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isSelected ? 'bg-primary text-white' : 'border border-outline-variant text-transparent'}`}>
                              ✓
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 3: Budget & Visibility */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                      Total Estimated Budget Target (₹)
                    </label>
                    <input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      placeholder="35000"
                      className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                      Visibility & Sharing Mode
                    </label>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
                    >
                      <option value="public" className="bg-surface">Public (Generate shareable link & allow cloning)</option>
                      <option value="private" className="bg-surface">Private (Only visible to you)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 4: Cover Artwork Selection & Finish */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="w-full aspect-video relative group border border-outline-variant rounded-xl overflow-hidden shadow-paper">
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur p-4 rounded-xl border border-outline-variant">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary block">Selected Artwork</span>
                      <div className="flex gap-2 mt-2">
                        {sampleCovers.map((imgUrl, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCoverImage(imgUrl)}
                            className={`w-10 h-10 rounded-lg border-2 overflow-hidden ${
                              coverImage === imgUrl ? 'border-primary' : 'border-outline-variant'
                            }`}
                          >
                            <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-outline-variant">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 border border-on-surface text-on-surface text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-surface-container-low transition cursor-pointer"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-2 shadow-paper cursor-pointer"
                  >
                    <span>Next Step</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-2 shadow-paper cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Creating Itinerary...' : 'Finish & Open Builder'}</span>
                    <span className="material-symbols-outlined text-base">check_circle</span>
                  </button>
                )}
              </div>

            </form>
          </div>

          {/* Right Column: Live Summary Preview (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper sticky top-28 space-y-6">
              <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-semibold border-b border-outline-variant pb-2">
                Live Trip Summary Preview
              </span>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-on-surface">
                  {title || 'Untitled Journey'}
                </h3>
                <p className="text-xs font-mono text-secondary">
                  {startDate} — {endDate}
                </p>
                <p className="text-xs text-on-surface-variant line-clamp-3 italic">
                  "{description || 'A multi-city travel itinerary created with GlobeTrotter.'}"
                </p>
              </div>

              <div className="border-t border-outline-variant pt-4 space-y-3 text-xs">
                <div>
                  <span className="text-secondary block font-semibold mb-1">Selected Cities ({selectedCities.length}):</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCities.map((c) => (
                      <span key={c} className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-secondary block font-semibold mb-1">Selected Tourist Places ({selectedAttractions.length}):</span>
                  <ul className="space-y-1">
                    {selectedAttractions.slice(0, 4).map((a, i) => (
                      <li key={i} className="text-[11px] font-medium text-on-surface truncate">
                        • {a}
                      </li>
                    ))}
                    {selectedAttractions.length > 4 && (
                      <li className="text-[10px] text-secondary">
                        + {selectedAttractions.length - 4} more places scheduled
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex justify-between border-t border-outline-variant/60 pt-3">
                  <span className="text-secondary">Target Budget:</span>
                  <span className="font-mono font-bold text-on-surface">₹{Number(totalBudget).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
