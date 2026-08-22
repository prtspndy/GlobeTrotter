import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

export default function CalendarTimelinePage() {
  const { id } = useParams();
  const { getTrip } = useTrip();

  const trip = getTrip(id);
  const [selectedDay, setSelectedDay] = useState(1);

  if (!trip) {
    return (
      <div className="max-w-container-max mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-on-surface">Trip Not Found</h2>
        <Link to="/trips" className="inline-block px-6 py-2.5 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  // Calculate day-wise schedule list from trip stops and activities
  const allActivities = [];
  trip.stops?.forEach((stop) => {
    stop.activities?.forEach((act) => {
      allActivities.push({
        ...act,
        cityName: stop.cityName
      });
    });
  });

  return (
    <div className="w-full bg-surface pb-24">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-6 gap-4">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-1">
              Chronological Schedule & Timeline
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
              {trip.title} Timeline
            </h1>
            <p className="text-xs text-secondary mt-1">
              {trip.startDate} &mdash; {trip.endDate} &bull; {allActivities.length} scheduled itinerary items
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/trips/${trip.id}`}
              className="px-5 py-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition flex items-center gap-1.5 shadow-paper"
            >
              <span className="material-symbols-outlined text-base">map</span>
              Itinerary Builder
            </Link>
          </div>
        </header>

        {/* Day Selector Ribbon */}
        <div className="flex gap-3 overflow-x-auto pb-2 border-b border-outline-variant">
          {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => (
            <button
              key={dayNum}
              onClick={() => setSelectedDay(dayNum)}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-sm min-w-[100px] text-center border transition ${
                selectedDay === dayNum
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface border-outline-variant text-secondary hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Day {dayNum}
            </button>
          ))}
        </div>

        {/* Vertical Timeline View */}
        <div className="bg-surface border border-outline-variant p-6 lg:p-8 rounded-sm shadow-paper space-y-8">
          
          <div className="flex justify-between items-center border-b border-outline-variant pb-4">
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              Day {selectedDay} Schedule & Activities
            </h2>
            <span className="text-xs font-mono font-semibold text-secondary">
              Day {selectedDay} of 7
            </span>
          </div>

          {allActivities.length === 0 ? (
            <div className="text-center py-12 text-xs text-secondary">
              No scheduled activities for this day yet. Add activities in the Itinerary Builder!
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 border-l-2 border-primary">
              {allActivities.map((act, idx) => (
                <div key={act.id || idx} className="relative group bg-surface-container-low border border-outline-variant p-5 rounded-sm hover:border-primary transition space-y-2">
                  <div className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-primary border-2 border-surface" />

                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-surface border border-primary/30 text-primary font-mono text-xs font-bold rounded-sm">
                        {act.time || '10:00 AM'}
                      </span>
                      <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                        {act.cityName}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-on-surface">${act.cost}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-on-surface">{act.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{act.description}</p>

                  <div className="flex items-center gap-3 pt-2 text-[11px] text-secondary border-t border-outline-variant/40 font-mono">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {act.duration}</span>
                    <span>&bull;</span>
                    <span className="uppercase">{act.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
