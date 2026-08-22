import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES, MOCK_ACTIVITIES } from '../data/mockData';
import ShareTripModal from '../components/modals/ShareTripModal';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Plus, CheckCircle2, ArrowRight, Landmark, Bell, Trash2, X, AlertCircle, Share2 } from 'lucide-react';

export default function CalendarTimelinePage() {
  const { id } = useParams();
  const { trips, getTrip, addActivityToStop, addReminder, deleteReminder } = useTrip();

  // If no ID in route parameter, fallback to active or first trip
  const activeTripId = id || trips[0]?.id;
  const trip = getTrip(activeTripId) || trips[0];

  // Dynamic Live Date State using new Date() / Date.now()
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDateStr, setSelectedDateStr] = useState(today.toISOString().split('T')[0]);

  const [addedToast, setAddedToast] = useState('');
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // New Reminder Form State
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00 AM');
  const [reminderType, setReminderType] = useState('Flight Booking');

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

  trip.stops?.forEach((stop) => {
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

  // Reminders map by date
  const remindersByDate = {};
  trip.reminders?.forEach((rem) => {
    if (!remindersByDate[rem.date]) remindersByDate[rem.date] = [];
    remindersByDate[rem.date].push(rem);
  });

  // Selected Date Info
  const selectedCityName = cityByDate[selectedDateStr] || trip.stops?.[0]?.cityName || 'Jaipur';
  const selectedCityObj = MOCK_CITIES.find((c) => c.name.toLowerCase() === selectedCityName.toLowerCase()) || MOCK_CITIES[0];
  const selectedDayActivities = activitiesByDate[selectedDateStr] || [];
  const selectedDayReminders = remindersByDate[selectedDateStr] || [];

  // Get famous tourist places (Jovalayak Sthal) for the selected city
  const cityAttractions = MOCK_ACTIVITIES.filter((act) =>
    act.cityName?.toLowerCase().includes(selectedCityName.toLowerCase()) ||
    selectedCityName.toLowerCase().includes(act.cityName?.toLowerCase() || '')
  );

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
      setAddedToast(`Scheduled "${place.name || place.title}" on ${selectedDateStr}!`);
      setTimeout(() => setAddedToast(''), 3000);
    }
  };

  const handleCreateReminderSubmit = (e) => {
    e.preventDefault();
    if (!reminderTitle.trim()) return;

    addReminder(trip.id, {
      title: reminderTitle,
      date: selectedDateStr,
      time: reminderTime,
      type: reminderType
    });

    setReminderTitle('');
    setShowReminderModal(false);
    setAddedToast(`Set Travel Reminder: "${reminderTitle}" for ${selectedDateStr}!`);
    setTimeout(() => setAddedToast(''), 3000);
  };

  return (
    <div className="w-full bg-surface pb-24 relative">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
        
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-label-caps text-xs text-primary uppercase tracking-widest font-semibold mb-1">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <span>LIVE TRAVEL CALENDAR, REMINDERS & DAILY PLANNER</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
              {trip.title}
            </h1>
            <p className="text-xs text-secondary mt-1">
              Live Calendar &bull; Today: <strong className="font-mono text-primary">{today.toDateString()}</strong> &bull; {trip.reminders?.length || 0} Reminders Set
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
              onClick={() => setShowReminderModal(true)}
              className="px-3.5 py-2 bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-amber-600 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>+ Add Reminder</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-3.5 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Trip Plan</span>
            </button>

            <Link
              to={`/trips/${trip.id}`}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-1.5 shadow-paper"
            >
              <span>Open Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Month Control Header */}
        <div className="flex justify-between items-center bg-surface border border-outline-variant p-4 rounded-2xl shadow-paper">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <span className="px-3 py-1 bg-surface-container text-primary font-mono text-xs font-bold rounded-lg border border-primary/20">
              Click any date to view City, Tourist Places, Activities & Reminders
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handlePrevMonth} className="p-2.5 bg-surface-container-low border border-outline-variant rounded-xl hover:border-primary cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleNextMonth} className="p-2.5 bg-surface-container-low border border-outline-variant rounded-xl hover:border-primary cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Added Toast Notification */}
        {addedToast && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 shadow-paper">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{addedToast}</span>
          </div>
        )}

        {/* Main 2-Column Split: Monthly Calendar (Span 6) + Complete Daily Travel Plan (Span 6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Monthly Calendar Matrix (Span 6) */}
          <div className="lg:col-span-6 bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper space-y-4">
            
            <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-outline-variant">
              {daysOfWeek.map((day) => (
                <span key={day} className="text-xs font-bold text-secondary uppercase font-mono">
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
                const dayRems = remindersByDate[dateStr] || [];
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
                      {dayRems.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" title={`${dayRems.length} Travel Reminder`} />
                      )}
                    </div>

                    <div className="space-y-1 overflow-hidden">
                      {dayCity && (
                        <span className="text-[8px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1 rounded truncate block">
                          {dayCity}
                        </span>
                      )}
                      {dayRems.slice(0, 1).map((rem, rIdx) => (
                        <div key={rIdx} className="px-1 py-0.5 bg-amber-500 text-white text-[8px] font-medium rounded truncate flex items-center gap-0.5">
                          <Bell className="w-2 h-2" />
                          <span>{rem.title}</span>
                        </div>
                      ))}
                      {dayActs.slice(0, 1).map((act, aIdx) => (
                        <div key={aIdx} className="px-1 py-0.5 bg-primary text-white text-[8px] font-medium rounded truncate">
                          {act.name || act.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Right Column: Complete Daily Breakdown (City + Reminders + Tourist Places + Activities) (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. WHERE TO GO (City Banner) */}
            <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-paper space-y-4">
              <div className="relative h-32 overflow-hidden">
                <img src={selectedCityObj.image} alt={selectedCityName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-3 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Where to Go (City Destination)</span>
                </div>
                <div className="absolute bottom-3 left-4 text-white">
                  <h3 className="font-serif text-2xl font-bold">{selectedCityName}, {selectedCityObj.state || selectedCityObj.country}</h3>
                  <span className="text-[11px] text-white/80 font-mono">Date: {new Date(selectedDateStr + 'T00:00:00').toDateString()}</span>
                </div>
              </div>
            </div>

            {/* 2. TRAVEL REMINDERS FOR THIS DATE */}
            <div className="bg-surface border border-outline-variant p-5 rounded-2xl shadow-paper space-y-3">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <h4 className="font-serif text-lg font-bold text-on-surface flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span>Travel Reminders ({selectedDayReminders.length})</span>
                </h4>
                <button
                  onClick={() => setShowReminderModal(true)}
                  className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-semibold uppercase rounded-lg hover:bg-amber-600 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Reminder</span>
                </button>
              </div>

              {selectedDayReminders.length > 0 ? (
                <div className="space-y-2">
                  {selectedDayReminders.map((rem) => (
                    <div key={rem.id} className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <div>
                          <h5 className="text-xs font-bold text-on-surface">{rem.title}</h5>
                          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono block">{rem.time} &bull; {rem.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReminder(trip.id, rem.id)}
                        className="text-secondary hover:text-error transition p-1"
                        title="Delete Reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-secondary italic">No travel reminders set for {selectedDateStr}. Click "+ Add Reminder" to set flight, hotel or ticket alerts!</p>
              )}
            </div>

            {/* 3. WHICH TOURIST PLACES (Jovalayak Sthal) TO VISIT */}
            <div className="bg-surface border border-outline-variant p-5 rounded-2xl shadow-paper space-y-3">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <h4 className="font-serif text-lg font-bold text-on-surface flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span>Tourist Places (Jovalayak Sthal) in {selectedCityName}</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-1">
                {cityAttractions.map((place, pIdx) => (
                  <div key={pIdx} className="p-2.5 bg-surface-container-low border border-outline-variant rounded-xl flex items-center justify-between gap-2">
                    <img src={place.image} alt={place.name || place.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-on-surface truncate">{place.name || place.title}</h5>
                      <span className="text-[10px] text-primary font-mono block">₹{place.cost} &bull; {place.duration || '2 hrs'}</span>
                    </div>
                    <button
                      onClick={() => handleAddAttractionToCalendarDate(place)}
                      className="px-2.5 py-1 bg-primary text-white text-[10px] font-semibold uppercase rounded-lg hover:bg-primary-container transition flex items-center gap-1 cursor-pointer flex-shrink-0"
                      title="Add to Day Schedule"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. WHAT ACTIVITIES TO DO ON THIS DAY */}
            <div className="bg-surface border border-outline-variant p-5 rounded-2xl shadow-paper space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <h4 className="font-serif text-lg font-bold text-on-surface flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Scheduled Activities for {selectedDateStr}</span>
                </h4>
                <span className="text-xs font-mono font-bold text-primary">{selectedDayActivities.length} Items</span>
              </div>

              {selectedDayActivities.length > 0 ? (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {selectedDayActivities.map((act, aIdx) => (
                    <div key={aIdx} className="p-3.5 bg-surface-container-low border border-outline-variant rounded-xl flex justify-between items-start gap-3 hover:border-primary transition">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px] font-bold rounded-md">
                            {act.time || '10:00 AM'}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-secondary">{act.category}</span>
                        </div>
                        <h5 className="text-xs font-bold text-on-surface">{act.name || act.title}</h5>
                      </div>
                      <span className="text-xs font-mono font-bold text-on-surface">₹{act.cost}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-outline-variant rounded-xl p-4 space-y-1">
                  <p className="text-xs text-secondary">No activities scheduled for this date yet.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Add Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper max-w-md w-full space-y-5">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h3 className="font-serif text-xl font-bold text-on-surface flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <span>Add Travel Reminder</span>
              </h3>
              <button onClick={() => setShowReminderModal(false)} className="text-secondary hover:text-on-surface cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReminderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Reminder Title *</label>
                <input
                  type="text"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  placeholder="e.g. Flight Web Check-in & Boarding Pass"
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={selectedDateStr}
                    onChange={(e) => setSelectedDateStr(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Time</label>
                  <input
                    type="text"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Reminder Type</label>
                <select
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                >
                  <option value="Flight Booking">Flight / Train Booking</option>
                  <option value="Hotel Check-in">Hotel Check-in / Reservation</option>
                  <option value="Monument Ticket">Monument / Tour Ticket</option>
                  <option value="Packing Checklist">Packing & Document Checklist</option>
                  <option value="General Reminder">General Alert</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-600 transition shadow-sm cursor-pointer"
              >
                Set Travel Reminder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Share Trip Modal */}
      <ShareTripModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} trip={trip} />

    </div>
  );
}
