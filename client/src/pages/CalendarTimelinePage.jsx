import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function CalendarTimelinePage() {
  const { id } = useParams();
  const { getTrip } = useTrip();

  const trip = getTrip(id);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-on-surface">Trip Not Found</h2>
        <Link to="/trips" className="inline-block px-4 py-2 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <Link to={`/trips/${trip.id}`} className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline flex items-center space-x-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Itinerary Builder</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-on-surface">
            Calendar & Timeline: {trip.title}
          </h1>
        </div>
      </div>

      {/* City Transition Timeline Bar */}
      <div className="bg-surface border border-outline/40 p-8 shadow-paper space-y-6">
        <h3 className="font-serif text-xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
          Destination Sequence Timeline
        </h3>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
          {trip.stops?.map((stop, idx) => (
            <React.Fragment key={stop.id}>
              <div className="flex-1 bg-surface-container-low border border-outline/30 p-5 rounded-sm space-y-2 relative z-10 w-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                  Stop {idx + 1}
                </span>
                <h4 className="font-serif text-xl font-bold text-on-surface">
                  {stop.cityName}, {stop.country}
                </h4>
                <p className="text-xs text-outline font-medium">
                  {stop.startDate} &mdash; {stop.endDate}
                </p>
                <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-semibold bg-surface border border-outline-variant/60 rounded-sm">
                  {stop.days?.length || 1} Scheduled Days
                </span>
              </div>

              {idx < (trip.stops?.length || 1) - 1 && (
                <div className="hidden md:flex items-center justify-center text-primary font-bold text-xl px-2">
                  &rarr;
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Day-by-Day Calendar Schedule Grid */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
          Daily Activity Schedule Grid
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trip.stops?.flatMap(stop => stop.days?.map(day => ({ ...day, cityName: stop.cityName }))).map((day, dIdx) => (
            <div key={dIdx} className="bg-surface border border-outline/40 p-6 shadow-paper space-y-4">
              <div className="flex justify-between items-baseline border-b border-outline-variant/40 pb-2">
                <span className="font-serif text-lg font-bold text-on-surface">
                  Day {day.dayNumber}: {day.cityName}
                </span>
                <span className="text-xs text-outline">{day.date}</span>
              </div>

              <p className="text-xs text-on-surface-variant italic">
                "{day.notes}"
              </p>

              <div className="space-y-2 pt-2">
                {day.activities?.length === 0 ? (
                  <span className="text-xs text-outline block">No scheduled activities for this day.</span>
                ) : (
                  day.activities?.map(act => (
                    <div key={act.id} className="p-3 bg-surface-container-low border border-outline/30 rounded-sm space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider text-primary">
                        <span>{act.startTime}</span>
                        <span>${act.cost}</span>
                      </div>
                      <h5 className="font-serif text-sm font-bold text-on-surface">{act.title}</h5>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
