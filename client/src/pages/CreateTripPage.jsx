import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { createTrip } = useTrip();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      return setError('Please enter a trip title.');
    }

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
      
      {/* Transactional Top Bar */}
      <header className="w-full flex items-center justify-between px-margin-mobile md:px-margin-desktop py-6 border-b border-outline-variant bg-surface sticky top-0 z-40">
        <Link to="/trips" className="flex items-center gap-3 hover:opacity-70 transition">
          <span className="material-symbols-outlined text-secondary">arrow_back</span>
          <span className="font-body-md font-medium text-secondary">Back to My Trips</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="w-2.5 h-2.5 rounded-full bg-surface-container-high border border-outline-variant" />
          <span className="font-mono text-xs text-secondary ml-2">01 / 02</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface mb-3">
                Where will your next story take you?
              </h1>
              <p className="text-base text-secondary font-light">
                Start with the core details. You can add destinations and day-by-day activities next.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-error-container/60 border border-error/40 text-on-error-container text-xs rounded-sm">
                {error}
              </div>
            )}

            {/* Cover Photo Display */}
            <div className="w-full aspect-video relative group border border-outline-variant rounded-sm overflow-hidden shadow-paper">
              <img
                src={coverImage}
                alt="Trip Cover"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="bg-surface/90 backdrop-blur border border-outline-variant p-6 rounded-sm text-center shadow-paper space-y-3 max-w-sm">
                  <span className="material-symbols-outlined text-3xl text-on-surface">add_photo_alternate</span>
                  <p className="font-serif text-lg font-bold text-on-surface">Select Cover Artwork</p>
                  
                  <div className="flex gap-2 justify-center pt-2">
                    {sampleCovers.map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCoverImage(imgUrl)}
                        className={`w-12 h-12 rounded-sm border-2 overflow-hidden ${
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

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="relative w-full">
                <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Trip Name / Masthead Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. European Summer Escape 2026"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-lg font-serif transition-colors placeholder-secondary/50"
                />
              </div>

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
                    className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm transition-colors"
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
                    className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Initial Destination City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm transition-colors"
                >
                  {MOCK_CITIES.map((c) => (
                    <option key={c.id} value={c.name} className="bg-surface text-on-surface">
                      {c.name}, {c.country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                    Total Estimated Budget ($)
                  </label>
                  <input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    placeholder="3500"
                    className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                    Visibility Mode
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm transition-colors"
                  >
                    <option value="public" className="bg-surface">Public (Shareable Link Enabled)</option>
                    <option value="private" className="bg-surface">Private (Only Me)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Trip Description / Travel Notes
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your trip aspirations, accommodation notes, or transport preferences..."
                  className="w-full bg-transparent border border-outline-variant p-3 rounded-sm text-on-surface text-sm focus:outline-none focus:border-primary placeholder-secondary/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-semibold text-xs uppercase tracking-wider py-4 px-6 rounded-sm shadow-paper hover:bg-primary-container transition flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Creating Itinerary...' : 'Create Trip & Continue to Builder'}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>

            </form>
          </div>

          {/* Right Column: Preview Summary Card (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper sticky top-28 space-y-6">
              <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-semibold border-b border-outline-variant pb-2">
                Trip Preview
              </span>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-on-surface">
                  {title || 'Untitled Excursion'}
                </h3>
                <p className="text-xs text-secondary">
                  {startDate} — {endDate}
                </p>
                <p className="text-xs text-on-surface-variant line-clamp-3 italic">
                  "{description || 'A multi-city journey planned with GlobeTrotter.'}"
                </p>
              </div>

              <div className="border-t border-outline-variant pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">Starting City:</span>
                  <span className="font-semibold text-on-surface">{selectedCity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">Budget Target:</span>
                  <span className="font-semibold text-on-surface">${Number(totalBudget).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">Visibility:</span>
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
