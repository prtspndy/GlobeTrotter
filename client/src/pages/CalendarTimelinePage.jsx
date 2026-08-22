import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MOCK_ACTIVITIES } from '../data/mockData';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Plus, CheckCircle2, ArrowRight, Eye, Building } from 'lucide-react';

export default function CalendarTimelinePage() {
  const { id } = useParams();
  const { trips, getTrip, addActivityToStop } = useTrip();

  // If no ID in route parameter, fallback to active or first trip
  const activeTripId = id || trips[0]?.id;
  const trip = getTrip(activeTripId) || trips[0];

  // Dynamic Live Date State using new Date() / Date.now()
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDateStr, setSelectedDateStr] = useState(today.toISOString().split('T')[0]);

  // View Mode: 'calendar' | 'city_view' | 'places_view'
  const [viewTab, setViewTab] = useState('calendar');
  const [addedToast, setAddedToast] = useState('');

  if (!trip) {
    return (
      <div className="max-w-container-max mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-on-surface">No Trips Found</h2>
        <p className="text-xs text-secondary">Plan a new trip to view your interactive travel calendar.</p>
        <Link to="/trips/create" className="inline-block px-6 py-2.5 bg-primary text-white text-xs uppercase font-semibold rounded-xl">
          Plan New Trip
        </Link>
      </div>
    );
  }

  // Month Names Array
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const formatDateString = (year, month, day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setSelectedDateStr(now.toISOString().split('T')[0]);
  };

  // Map trip stops & activities by Date
  const activitiesByDate = {};
  const cityByDate = {};

  trip.stops?.forEach((stop, sIdx) => {
    const stopDate = stop.arrivalDate || trip.startDate;
    cityByDate[stopDate] = stop.cityName;

    if (!activitiesByDate[stopDate]) activitiesByDate[stopDate] = [];
    
    stop.activities?.forEach((act) => {
      activitiesByDate[stopDate].push({
        ...act,
        stopId: stop.id,
        cityName: stop.cityName
      });
    });
  });

  // Selected date city & activities list
  const selectedCityName = cityByDate[selectedDateStr] || trip.stops?.[0]?.cityName || 'Jaipur';
  const selectedDayActivities = activitiesByDate[selectedDateStr] || [];

  // Get tourist places (Jovalayak Sthal) for the selected city
  const cityAttractions = MOCK_ACTIVITIES.filter((act) =>
    act.cityName?.toLowerCase().includes(selectedCityName.toLowerCase()) ||
    selectedCityName.toLowerCase().includes(act.cityName?.toLowerCase() || '')
  );

  // Quick 1-Click add tourist place to calendar date
  const handleAddAttractionToCalendarDate = (place) => {
    const targetStop = trip.stops?.find((s) => s.cityName.toLowerCase() === selectedCityName.toLowerCase()) || trip.stops?.[0];
    if (targetStop) {
      addActivityToStop(trip.id, targetStop.id, {
        title: place.name || place.title,
        time: '11:00 AM',
        cost: place.cost || 200,
        category: place.category || 'Sightseeing',
        duration: place.duration || '2 hours',
        description: place.description || `Famous tourist attraction in ${selectedCityName}.`
      });
      setAddedToast(`Added "${place.name || place.title}" to ${selectedDateStr} schedule!`);
      setTimeout(() => setAddedToast(''), 3000);
    }
  };

  return (
    <div className="w-full bg-surface pb-24">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
        
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-label-caps text-xs text-primary uppercase tracking-widest font-semibold mb-1">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <span>TRIP CALENDAR & TOURIST PLACES (JOVALAYAK STHAL)</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
              {trip.title}
            </h1>
            <p className="text-xs text-secondary mt-1">
              Live Dates &bull; Today: <strong className="font-mono text-primary">{today.toDateString()}</strong> &bull; {trip.stops?.length || 0} Cities Planned
            </p>
          </div>

          {/* Trip Selector & Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {trips.length > 1 && (
              <select
                value={trip.id}
                onChange={(e) => window.location.href = `/trips/${e.target.value}/calendar`}
                className="bg-surface-container-low border border-outline-variant rounded-xl text-xs px-3 py-2 text-on-surface outline-none"
              >
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            )}

            <button
              onClick={handleJumpToToday}
              className="px-3.5 py-2 bg-surface-container-low border border-outline-variant text-xs font-semibold rounded-xl text-on-surface hover:border-primary transition cursor-pointer"
            >
              Today
            </button>

            <Link
              to={`/trips/${trip.id}`}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-1.5 shadow-paper"
            >
              <span>Itinerary Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* View Mode Tabs (Calendar | City-Wise View | Jovalayak Sthal Places View) */}
        <div className="flex justify-between items-center bg-surface border border-outline-variant p-4 rounded-2xl shadow-paper flex-wrap gap-4">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewTab('calendar')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                viewTab === 'calendar'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface-container-low border-outline-variant text-on-surface hover:border-primary'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Full Calendar View</span>
            </button>

            <button
              onClick={() => setViewTab('city_view')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                viewTab === 'city_view'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface-container-low border-outline-variant text-on-surface hover:border-primary'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>City-Wise Schedule</span>
            </button>

            <button
              onClick={() => setViewTab('places_view')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                viewTab === 'places_view'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface-container-low border-outline-variant text-on-surface hover:border-primary'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tourist Places (Jovalayak Sthal)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-secondary">
            <span>{monthNames[currentMonth]} {currentYear}</span>
            <div className="flex gap-1 ml-2">
              <button onClick={handlePrevMonth} className="p-1.5 bg-surface-container-low border rounded-lg hover:border-primary">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={handleNextMonth} className="p-1.5 bg-surface-container-low border rounded-lg hover:border-primary">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Added Toast Notification */}
        {addedToast && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 shadow-paper">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{addedToast}</span>
          </div>
        )}

        {/* TAB 1: FULL CALENDAR GRID + DAY SCHEDULE & JOVALAYAK STHAL DRAWER */}
        {viewTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Calendar Grid (Span 7) */}
            <div className="lg:col-span-7 bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper space-y-4">
              
              <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-outline-variant">
                {daysOfWeek.map((day) => (
                  <span key={day} className="text-xs font-bold text-secondary uppercase tracking-wider font-mono">
                    {day}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-20 sm:h-24 bg-surface-container-low/30 rounded-xl opacity-30 border border-transparent" />
                ))}

                {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = formatDateString(currentYear, currentMonth, dayNum);
                  const isSelected = selectedDateStr === dateStr;

                  const isToday =
                    today.getFullYear() === currentYear &&
                    today.getMonth() === currentMonth &&
                    today.getDate() === dayNum;

                  const isTripDate = dateStr >= trip.startDate && dateStr <= trip.endDate;
                  const dayActs = activitiesByDate[dateStr] || [];
                  const dayCity = cityByDate[dateStr];

                  return (
                    <div
                      key={dayNum}
                      onClick={() => setSelectedDateStr(dateStr)}
                      className={`h-20 sm:h-24 p-2 rounded-xl border transition cursor-pointer flex flex-col justify-between relative group ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-md'
                          : isToday
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                          : isTripDate
                          ? 'border-outline-variant bg-surface-container-low hover:border-primary/50'
                          : 'border-outline-variant/40 bg-surface/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-bold font-mono ${isToday ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-on-surface'}`}>
                          {dayNum}
                        </span>
                        {dayCity && (
                          <span className="text-[8px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1 rounded truncate max-w-[50px]">
                            {dayCity}
                          </span>
                        )}
                      </div>

                      {/* Scheduled Activities Badges */}
                      <div className="space-y-1 overflow-hidden">
                        {dayActs.slice(0, 2).map((act, aIdx) => (
                          <div key={aIdx} className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-medium rounded truncate shadow-sm">
                            {act.name || act.title}
                          </div>
                        ))}
                        {dayActs.length > 2 && (
                          <span className="text-[9px] text-primary font-bold block">
                            +{dayActs.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>

            {/* Day Schedule & Tourist Places Drawer (Span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Selected Day Header */}
              <div className="bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper space-y-4">
                <div className="border-b border-outline-variant pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                      SCHEDULE FOR {selectedCityName}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-on-surface">
                      {new Date(selectedDateStr + 'T00:00:00').toDateString()}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-surface-container text-on-surface font-semibold text-xs rounded-xl border border-outline-variant">
                    {selectedCityName} Stop
                  </span>
                </div>

                {/* Scheduled Activities List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Scheduled Activities ({selectedDayActivities.length})
                  </h4>

                  {selectedDayActivities.length > 0 ? (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {selectedDayActivities.map((act, aIdx) => (
                        <div key={aIdx} className="p-3 bg-surface-container-low border border-outline-variant rounded-xl flex justify-between items-center">
                          <div>
                            <span className="text-[10px] font-mono text-primary font-bold block">{act.time || '10:00 AM'} &bull; {act.category}</span>
                            <h5 className="text-xs font-bold text-on-surface">{act.name || act.title}</h5>
                          </div>
                          <span className="text-xs font-mono font-bold text-on-surface">₹{act.cost}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-secondary italic">
                      No activities scheduled for this date yet. Select a tourist place below to add!
                    </p>
                  )}
                </div>

                {/* Jovalayak Sthal / Tourist Places for this City */}
                <div className="pt-4 border-t border-outline-variant space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Famous Tourist Places in {selectedCityName}</span>
                    </h4>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {cityAttractions.map((place, pIdx) => (
                      <div key={pIdx} className="p-3 bg-surface-container-low border border-outline-variant rounded-xl flex items-center justify-between gap-3">
                        <img src={place.image} alt={place.name || place.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-on-surface truncate">{place.name || place.title}</h5>
                          <span className="text-[10px] text-primary font-mono block">₹{place.cost} &bull; {place.duration || '2 hrs'}</span>
                        </div>
                        <button
                          onClick={() => handleAddAttractionToCalendarDate(place)}
                          className="px-3 py-1.5 bg-primary text-white text-[10px] font-semibold uppercase rounded-lg hover:bg-primary-container transition flex items-center gap-1 cursor-pointer flex-shrink-0"
                          title="Add to Calendar Schedule"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CITY-WISE SCHEDULE VIEW */}
        {viewTab === 'city_view' && (
          <div className="space-y-6">
            {trip.stops?.map((stop, sIdx) => (
              <div key={stop.id || sIdx} className="bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                  <div className="flex items-center gap-3">
                    <img src={stop.image} alt={stop.cityName} className="w-12 h-12 rounded-xl object-cover border border-outline-variant" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                        Stop {sIdx + 1} &bull; {stop.country}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-on-surface">{stop.cityName}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-secondary">{stop.arrivalDate} &mdash; {stop.departureDate}</span>
                </div>

                {/* City Activities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stop.activities?.map((act, aIdx) => (
                    <div key={aIdx} className="p-4 bg-surface-container-low border border-outline-variant rounded-xl space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] font-mono text-primary font-bold">{act.time || '10:00 AM'}</span>
                        <span className="text-xs font-mono font-bold text-on-surface">₹{act.cost}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-on-surface">{act.name || act.title}</h4>
                      <p className="text-xs text-secondary leading-relaxed">{act.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: JOVALAYAK STHAL / TOURIST PLACES EXPLORER */}
        {viewTab === 'places_view' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant pb-3">
              All Tourist Places (Jovalayak Sthal) in Planned Cities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trip.stops?.flatMap((stop) =>
                MOCK_ACTIVITIES.filter((act) => act.cityName?.toLowerCase() === stop.cityName.toLowerCase()).map((place) => ({
                  ...place,
                  cityName: stop.cityName,
                  stopId: stop.id
                }))
              ).map((place, pIdx) => (
                <div key={pIdx} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-paper p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <img src={place.image} alt={place.name || place.title} className="w-full h-40 object-cover rounded-xl border border-outline-variant" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">{place.cityName} &bull; {place.category}</span>
                      <h4 className="font-serif text-lg font-bold text-on-surface">{place.name || place.title}</h4>
                      <p className="text-xs text-secondary line-clamp-2 mt-1">{place.description}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-outline-variant/60">
                    <span className="text-xs font-mono font-bold text-on-surface">₹{place.cost}</span>
                    <button
                      onClick={() => handleAddAttractionToCalendarDate(place)}
                      className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Schedule</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
