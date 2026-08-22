import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';
import Toast from '../components/ui/Toast';

export default function ItineraryBuilderPage() {
  const { id } = useParams();
  const { getTrip, addStopToTrip, removeStopFromTrip, addActivityToStop, removeActivityFromStop } = useTrip();

  const trip = getTrip(id);
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // New Stop form state
  const [selectedCityName, setSelectedCityName] = useState(MOCK_CITIES[0].name);
  const [stopArrival, setStopArrival] = useState('2026-06-15');
  const [stopDeparture, setStopDeparture] = useState('2026-06-18');

  // New Activity form state
  const [activityTitle, setActivityTitle] = useState('');
  const [activityTime, setActivityTime] = useState('10:00 AM');
  const [activityCategory, setActivityCategory] = useState('Sightseeing');
  const [activityCost, setActivityCost] = useState(25);
  const [activityDuration, setActivityDuration] = useState('2 hours');

  if (!trip) {
    return (
      <div className="max-w-container-max mx-auto px-6 py-20 text-center space-y-4">
        <span className="material-symbols-outlined text-secondary text-5xl">wrong_location</span>
        <h2 className="font-serif text-3xl font-bold text-on-surface">Trip Not Found</h2>
        <p className="text-xs text-secondary">The requested itinerary ID standard does not exist or was deleted.</p>
        <Link to="/trips" className="inline-block px-6 py-2.5 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  const expensesTotal = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
  const isOverBudget = expensesTotal > (trip.totalBudget || 3500);

  const handleAddStop = (e) => {
    e.preventDefault();
    const city = MOCK_CITIES.find((c) => c.name === selectedCityName) || MOCK_CITIES[0];
    addStopToTrip(trip.id, {
      cityName: city.name,
      country: city.country,
      image: city.image,
      arrivalDate: stopArrival,
      departureDate: stopDeparture,
      activities: []
    });
    setShowAddStopModal(false);
    setToastMessage(`Added ${city.name} to itinerary route!`);
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!activityTitle.trim() || !selectedStopId) return;

    addActivityToStop(trip.id, selectedStopId, {
      title: activityTitle,
      time: activityTime,
      category: activityCategory,
      cost: Number(activityCost) || 0,
      duration: activityDuration,
      description: 'Custom activity added to itinerary.'
    });

    setActivityTitle('');
    setShowAddActivityModal(false);
    setToastMessage(`Scheduled "${activityTitle}"!`);
  };

  return (
    <div className="w-full bg-surface pb-24 relative">
      
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}

      {/* HEADER HERO COVER */}
      <header className="relative w-full h-[50vh] min-h-[360px] bg-on-surface overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/30 to-transparent" />

        <div className="absolute inset-0 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col justify-between text-white">
          
          <div className="flex justify-between items-center">
            <Link to="/trips" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur px-3 py-1.5 rounded-sm border border-white/20 hover:bg-black/60 transition">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              My Trips
            </Link>

            <div className="flex gap-3">
              <Link to={`/trips/${trip.id}/budget`} className="flex items-center gap-1.5 px-4 py-2 bg-black/40 backdrop-blur border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white hover:text-on-surface transition">
                <span className="material-symbols-outlined text-base">payments</span>
                Budget
              </Link>

              <Link to={`/trips/${trip.id}/calendar`} className="flex items-center gap-1.5 px-4 py-2 bg-black/40 backdrop-blur border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white hover:text-on-surface transition">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                Calendar
              </Link>

              <Link to={`/globe/trip/${trip.shareId}`} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper">
                <span className="material-symbols-outlined text-base">share</span>
                Share Link
              </Link>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> {trip.startDate} — {trip.endDate}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_city</span> {trip.stops?.length || 0} Destination Stops</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              {trip.title}
            </h1>

            <p className="text-xs sm:text-sm text-white/90 line-clamp-2 max-w-2xl">
              {trip.description}
            </p>
          </div>

        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-12">
        
        {/* Smart Budget Advice Pill if over budget */}
        {isOverBudget && (
          <div className="p-4 bg-error-container/40 border border-error/50 rounded-sm text-xs text-on-error-container flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-base">warning</span>
              <strong>Smart Budget Alert:</strong> Total expenses (${expensesTotal.toLocaleString()}) exceed budget target (${trip.totalBudget.toLocaleString()}).
            </span>
            <Link to={`/trips/${trip.id}/budget`} className="text-primary font-bold hover:underline uppercase tracking-wider text-[11px]">
              Optimize Budget &rarr;
            </Link>
          </div>
        )}

        {/* Journey Route Nodes */}
        <section className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-3">
            <h2 className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">
              Journey Route & Multi-City Stops
            </h2>
            <button
              onClick={() => setShowAddStopModal(true)}
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-base">add_location_alt</span>
              Add Stop
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {trip.stops?.map((stop, idx) => (
              <React.Fragment key={stop.id || idx}>
                <div className="flex flex-col items-center min-w-[120px] p-3 border border-outline-variant rounded-sm bg-surface-container-low text-center space-y-1 relative group">
                  <button
                    onClick={() => {
                      removeStopFromTrip(trip.id, stop.id);
                      setToastMessage(`Removed ${stop.cityName} from route.`);
                    }}
                    className="absolute top-1 right-1 text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition p-0.5"
                    title="Remove Stop"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>

                  <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden mx-auto mb-1">
                    <img src={stop.image} alt={stop.cityName} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-serif text-base font-bold text-on-surface">{stop.cityName}</span>
                  <span className="text-[11px] text-secondary font-mono">{stop.arrivalDate ? stop.arrivalDate.slice(5) : ''}</span>
                </div>

                {idx < (trip.stops.length - 1) && (
                  <div className="flex-1 min-w-[60px] border-t-2 border-dashed border-primary relative mx-2">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 material-symbols-outlined text-primary text-sm bg-surface px-1">
                      {idx % 2 === 0 ? 'flight' : 'directions_railway'}
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* DAY-BY-DAY ITINERARY TIMELINE */}
        <section className="space-y-8">
          <div className="flex justify-between items-center border-b border-outline-variant pb-3">
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              Day-by-Day Itinerary & Schedule
            </h2>
          </div>

          {trip.stops?.map((stop, stopIdx) => (
            <div key={stop.id || stopIdx} className="bg-surface border border-outline-variant rounded-sm p-6 lg:p-8 shadow-paper space-y-6">
              
              {/* City Stop Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-outline-variant pb-4 gap-4">
                <div className="flex items-center space-x-4">
                  <img src={stop.image} alt={stop.cityName} className="w-14 h-14 object-cover border border-outline-variant rounded-sm" />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary block">
                      Stop {stopIdx + 1} &bull; {stop.country}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-on-surface">
                      {stop.cityName}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedStopId(stop.id);
                    setShowAddActivityModal(true);
                  }}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Add Activity
                </button>
              </div>

              {/* Activities Timeline */}
              {stop.activities?.length === 0 ? (
                <div className="text-center py-8 bg-surface-container-low border border-dashed border-outline-variant p-4">
                  <p className="text-xs text-secondary">No activities added to {stop.cityName} yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stop.activities?.map((act, actIdx) => (
                    <div key={act.id || actIdx} className="flex items-start gap-4 p-4 bg-surface-container-low border border-outline-variant rounded-sm hover:border-primary transition group">
                      
                      <div className="flex flex-col items-center min-w-[70px]">
                        <span className="text-xs font-semibold text-primary font-mono bg-surface border border-primary/30 px-2 py-0.5 rounded-sm">
                          {act.time}
                        </span>
                        <span className="text-[10px] text-secondary mt-1">{act.duration}</span>
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-serif text-base font-bold text-on-surface">{act.title}</h4>
                          <span className="text-xs font-mono font-bold text-on-surface">${act.cost}</span>
                        </div>
                        <p className="text-xs text-secondary leading-relaxed">{act.description}</p>
                        <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-semibold bg-surface border border-outline-variant text-on-surface-variant rounded-sm mt-1">
                          {act.category || 'Sightseeing'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          removeActivityFromStop(trip.id, stop.id, act.id);
                          setToastMessage('Activity removed.');
                        }}
                        className="text-secondary hover:text-error transition opacity-0 group-hover:opacity-100 p-1"
                        title="Remove activity"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </section>

      </main>

      {/* Add Stop Modal */}
      {showAddStopModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper max-w-md w-full space-y-5">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h3 className="font-serif text-xl font-bold text-on-surface">Add Destination Stop</h3>
              <button onClick={() => setShowAddStopModal(false)} className="text-secondary hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddStop} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Select City</label>
                <select
                  value={selectedCityName}
                  onChange={(e) => setSelectedCityName(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
                >
                  {MOCK_CITIES.map((c) => (
                    <option key={c.id} value={c.name} className="bg-surface">{c.name}, {c.country}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Arrival</label>
                  <input type="date" value={stopArrival} onChange={(e) => setStopArrival(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Departure</label>
                  <input type="date" value={stopDeparture} onChange={(e) => setStopDeparture(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline text-sm" />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-sm">
                Add Stop to Itinerary
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper max-w-md w-full space-y-5">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h3 className="font-serif text-xl font-bold text-on-surface">Add Activity</h3>
              <button onClick={() => setShowAddActivityModal(false)} className="text-secondary hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Activity Name *</label>
                <input type="text" value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} placeholder="e.g. Guided Colosseum Sunset Tour" required className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Time</label>
                  <input type="text" value={activityTime} onChange={(e) => setActivityTime(e.target.value)} placeholder="10:00 AM" className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Est. Cost ($)</label>
                  <input type="number" value={activityCost} onChange={(e) => setActivityCost(e.target.value)} placeholder="45" className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Category</label>
                  <select value={activityCategory} onChange={(e) => setActivityCategory(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1">
                    <option value="Sightseeing" className="bg-surface">Sightseeing</option>
                    <option value="Food & Dining" className="bg-surface">Food & Dining</option>
                    <option value="Culture" className="bg-surface">Culture</option>
                    <option value="Adventure" className="bg-surface">Adventure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Duration</label>
                  <input type="text" value={activityDuration} onChange={(e) => setActivityDuration(e.target.value)} placeholder="2 hours" className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1" />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-sm">
                Save Activity
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
