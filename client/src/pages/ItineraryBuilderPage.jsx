import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, DollarSign, PlusCircle, Trash2, CheckCircle2, Share2, Compass, MoveUp, MoveDown, Layers } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES, MOCK_ACTIVITIES } from '../data/mockData';

export default function ItineraryBuilderPage() {
  const { id } = useParams();
  const { getTrip, addCityStop, addActivityToDay, deleteActivity, deleteTrip } = useTrip();

  const trip = getTrip(id);

  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const [isAddCityOpen, setIsAddCityOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  // New activity form state
  const [newActTitle, setNewActTitle] = useState('');
  const [newActTime, setNewActTime] = useState('10:00');
  const [newActCost, setNewActCost] = useState(25);
  const [newActCategory, setNewActCategory] = useState('sightseeing');

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-on-surface">Trip Not Found</h2>
        <p className="text-xs text-on-surface-variant">The requested trip itinerary does not exist or was removed.</p>
        <Link to="/trips" className="inline-block px-4 py-2 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  const activeStop = trip.stops?.[activeStopIndex] || trip.stops?.[0];
  const activeDay = activeStop?.days?.find(d => d.dayNumber === activeDayNumber) || activeStop?.days?.[0];

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActTitle) return;

    addActivityToDay(trip.id, activeStop.id, activeDay.dayNumber, {
      name: newActTitle,
      startTime: newActTime,
      cost: Number(newActCost),
      category: newActCategory,
      durationMinutes: 120,
      locationName: activeStop.cityName
    });

    setNewActTitle('');
    setIsAddActivityOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Header */}
      <div className="relative border border-outline/40 bg-surface shadow-2xl overflow-hidden">
        <div className="h-64 sm:h-72 relative">
          <img 
            src={trip.coverImage} 
            alt={trip.title} 
            className="w-full h-full object-cover rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-primary-fixed">
              <Calendar className="w-4 h-4" />
              <span>{trip.startDate} &mdash; {trip.endDate}</span>
              <span>&bull;</span>
              <span>{trip.stops?.length || 0} City Stops</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {trip.title}
            </h1>
            <p className="text-xs sm:text-sm opacity-90 line-clamp-1 max-w-3xl">
              {trip.description}
            </p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-surface-container-high border-t border-outline-variant/60 px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex space-x-6 text-xs font-semibold uppercase tracking-wider">
            <Link to={`/trips/${trip.id}`} className="text-primary border-b-2 border-primary pb-1 flex items-center space-x-1.5">
              <Layers className="w-4 h-4" />
              <span>Itinerary Builder</span>
            </Link>
            <Link to={`/trips/${trip.id}/budget`} className="text-on-surface-variant hover:text-primary transition flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Budget Dashboard</span>
            </Link>
            <Link to={`/trips/${trip.id}/calendar`} className="text-on-surface-variant hover:text-primary transition flex items-center space-x-1.5">
              <Calendar className="w-4 h-4" />
              <span>Calendar Timeline</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to={`/globe/trip/${trip.shareId}`}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-surface border border-outline/40 text-tertiary font-semibold uppercase text-xs rounded-sm hover:bg-surface-container transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Public Link</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Multi-City Stops Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-on-surface">
                City Destinations ({trip.stops?.length || 0})
              </h3>
              <button
                onClick={() => setIsAddCityOpen(true)}
                className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline flex items-center space-x-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Stop</span>
              </button>
            </div>

            {/* Stops List */}
            <div className="space-y-3">
              {trip.stops?.map((stop, idx) => (
                <div
                  key={stop.id}
                  onClick={() => { setActiveStopIndex(idx); setActiveDayNumber(1); }}
                  className={`p-4 border cursor-pointer transition flex items-center justify-between ${
                    activeStopIndex === idx
                      ? 'bg-surface-container-low border-primary ring-1 ring-primary/40'
                      : 'bg-surface border-outline/30 hover:border-outline'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                      Stop {idx + 1} &bull; {stop.country}
                    </span>
                    <h4 className="font-serif text-base font-bold text-on-surface">
                      {stop.cityName}
                    </h4>
                    <span className="text-[11px] text-outline block">
                      {stop.startDate} to {stop.endDate}
                    </span>
                  </div>

                  <span className="px-2 py-1 text-[10px] uppercase font-semibold bg-surface-container border border-outline-variant/60 rounded-sm">
                    {stop.days?.length || 1} Days
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-surface-container-low border border-outline/40 p-6 shadow-paper space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-on-surface border-b border-outline-variant/60 pb-2">
              Trip Overview Metrics
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Stops:</span>
                <span className="font-semibold">{trip.stops?.length} Cities</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Scheduled Activities:</span>
                <span className="font-semibold">
                  {trip.stops?.reduce((acc, s) => acc + (s.days?.reduce((dAcc, d) => dAcc + d.activities.length, 0) || 0), 0)} Items
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Budget:</span>
                <span className="font-semibold text-primary">${trip.totalBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Day-Wise Itinerary Schedule */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Stop Header */}
          <div className="bg-surface border border-outline/40 p-6 shadow-paper flex justify-between items-center">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-primary block">
                Active City Destination
              </span>
              <h2 className="font-serif text-2xl font-bold text-on-surface">
                {activeStop?.cityName}, {activeStop?.country}
              </h2>
            </div>

            <button
              onClick={() => setIsAddActivityOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Activity to Day {activeDayNumber}</span>
            </button>
          </div>

          {/* Day Tabs Bar */}
          <div className="flex space-x-2 border-b border-outline-variant/60 pb-1 overflow-x-auto">
            {activeStop?.days?.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition whitespace-nowrap ${
                  activeDayNumber === day.dayNumber
                    ? 'border-primary text-primary font-bold bg-surface-container'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Day {day.dayNumber} &bull; {day.date}
              </button>
            ))}
          </div>

          {/* Scheduled Activities Timeline */}
          <div className="space-y-4">
            {activeDay?.activities?.length === 0 ? (
              <div className="bg-surface border border-outline/40 p-10 text-center space-y-3 shadow-paper">
                <Clock className="w-10 h-10 text-outline mx-auto" />
                <h4 className="font-serif text-lg font-bold text-on-surface">
                  No Activities Scheduled for Day {activeDayNumber}
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Add custom activities or select catalog items to build this day's itinerary schedule.
                </p>
                <button
                  onClick={() => setIsAddActivityOpen(true)}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
                >
                  Add First Activity
                </button>
              </div>
            ) : (
              activeDay?.activities?.map((act, actIdx) => (
                <div key={act.id} className="bg-surface border border-outline/40 p-5 shadow-paper flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-primary transition">
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary font-serif font-bold text-base flex flex-col items-center justify-center rounded-sm flex-shrink-0 border border-primary/20">
                      <span>{act.startTime}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-surface-container text-on-surface-variant border border-outline-variant/60 rounded-sm">
                          {act.category}
                        </span>
                        <span className="text-[11px] text-outline flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{act.durationMinutes} mins</span>
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-on-surface">
                        {act.title}
                      </h4>

                      <p className="text-xs text-on-surface-variant flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-outline" />
                        <span>{act.locationName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-outline-variant/40 pt-3 sm:pt-0">
                    <span className="font-serif font-bold text-sm text-primary">
                      ${act.cost}
                    </span>

                    <button
                      onClick={() => deleteActivity(trip.id, activeStop.id, activeDay.dayNumber, act.id)}
                      className="p-1.5 text-on-surface/40 hover:text-error transition"
                      title="Remove Activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {/* Add City Modal */}
      {isAddCityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface border border-outline/40 p-6 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-on-surface">Add Destination City Stop</h3>
            <p className="text-xs text-on-surface-variant">Select a city to add to this trip's route stops:</p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {MOCK_CITIES.map(c => (
                <div 
                  key={c.id}
                  onClick={() => { addCityStop(trip.id, c.id); setIsAddCityOpen(false); }}
                  className="p-3 border border-outline/30 hover:border-primary cursor-pointer flex justify-between items-center transition"
                >
                  <span className="font-serif text-sm font-bold text-on-surface">{c.name}, {c.country}</span>
                  <span className="text-[10px] uppercase font-semibold text-primary">+ Add</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsAddCityOpen(false)}
                className="px-4 py-2 text-xs uppercase font-semibold text-on-surface-variant"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {isAddActivityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface border border-outline/40 p-6 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-on-surface">Add Activity to Day {activeDayNumber}</h3>
            
            <form onSubmit={handleAddActivity} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold text-on-surface-variant mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={newActTitle}
                  onChange={(e) => setNewActTitle(e.target.value)}
                  placeholder="e.g. Guided Museum Tour & Espresso"
                  className="w-full p-2 bg-surface-container-low border border-outline/50 rounded-sm text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-on-surface-variant mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newActTime}
                    onChange={(e) => setNewActTime(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-outline/50 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-on-surface-variant mb-1">Cost ($ USD)</label>
                  <input
                    type="number"
                    value={newActCost}
                    onChange={(e) => setNewActCost(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-outline/50 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-on-surface-variant mb-1">Category</label>
                <select
                  value={newActCategory}
                  onChange={(e) => setNewActCategory(e.target.value)}
                  className="w-full p-2 bg-surface-container-low border border-outline/50 rounded-sm"
                >
                  <option value="sightseeing">Sightseeing</option>
                  <option value="culture">Culture & Museums</option>
                  <option value="food">Food & Wine</option>
                  <option value="relaxation">Relaxation</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddActivityOpen(false)}
                  className="px-4 py-2 text-xs uppercase font-semibold text-on-surface-variant"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white text-xs uppercase font-semibold rounded-sm"
                >
                  Add Activity Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
