import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { createTrip } = useTrip();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('2026-06-12');
  const [endDate, setEndDate] = useState('2026-06-24');
  const [description, setDescription] = useState('');
  const [totalBudget, setTotalBudget] = useState(3500);
  const [visibility, setVisibility] = useState('public');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'
  );
  const [selectedCity, setSelectedCity] = useState(MOCK_CITIES[0].name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sampleCovers = [
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleNext = () => {
    setError('');
    if (step === 1 && !title.trim()) {
      return setError('Please enter a trip name before continuing.');
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
      const cityData = MOCK_CITIES.find((c) => c.name === selectedCity) || MOCK_CITIES[0];
      const initialStops = [
        {
          id: `stop-${Date.now()}-1`,
          cityName: cityData.name,
          country: cityData.country,
          image: cityData.image,
          arrivalDate: startDate,
          departureDate: endDate,
          activities: cityData.activities?.slice(0, 2) || []
        }
      ];

      const newTrip = await createTrip({
        title,
        startDate,
        endDate,
        description: description || `Multi-city excursion exploring ${selectedCity}.`,
        totalBudget: Number(totalBudget) || 3000,
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
                {step === 2 && "When and where are you going?"}
                {step === 3 && "Set your budget & privacy controls"}
                {step === 4 && "Select artwork & finalize excursion"}
              </h1>
            </div>

            {error && (
              <div className="p-4 bg-error-container/60 border border-error/40 text-on-error-container text-xs rounded-sm">
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
                      placeholder="e.g. European Summer Escape 2026"
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
                      className="w-full bg-transparent border border-outline-variant p-3 rounded-sm text-on-surface text-sm focus:outline-none focus:border-primary placeholder-secondary/40"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Dates & Starting City */}
              {step === 2 && (
                <div className="space-y-6">
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

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                      Starting City Stop
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
                    >
                      {MOCK_CITIES.map((c) => (
                        <option key={c.id} value={c.name} className="bg-surface">
                          {c.name}, {c.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: Budget & Visibility */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                      Total Estimated Budget Target ($)
                    </label>
                    <input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      placeholder="3500"
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
                  <div className="w-full aspect-video relative group border border-outline-variant rounded-sm overflow-hidden shadow-paper">
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur p-4 rounded-sm border border-outline-variant">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary block">Selected Artwork</span>
                      <div className="flex gap-2 mt-2">
                        {sampleCovers.map((imgUrl, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCoverImage(imgUrl)}
                            className={`w-10 h-10 rounded-sm border-2 overflow-hidden ${
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
                    className="px-6 py-3 border border-on-surface text-on-surface text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-surface-container-low transition"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition flex items-center gap-2 shadow-paper"
                  >
                    <span>Next Step</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition flex items-center gap-2 shadow-paper disabled:opacity-50"
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
            <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper sticky top-28 space-y-6">
              <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-semibold border-b border-outline-variant pb-2">
                Trip Card Preview
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

              <div className="border-t border-outline-variant pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-secondary">Starting City:</span>
                  <span className="font-semibold text-on-surface">{selectedCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Budget Target:</span>
                  <span className="font-mono font-bold text-on-surface">${Number(totalBudget).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Visibility Mode:</span>
                  <span className="font-semibold text-primary capitalize">{visibility}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
