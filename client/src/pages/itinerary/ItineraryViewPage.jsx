import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { MOCK_CITIES } from '../../data/mockData';
import { calculateRoute } from '../../services/geoapifyService';
import TripMap from '../../components/map/TripMap';

export default function ItineraryViewPage() {
  const { id } = useParams();
  const { getTrip } = useTrip();

  const trip = getTrip(id);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    if (!trip?.stops || trip.stops.length < 2) return;

    let isMounted = true;
    async function fetchRouting() {
      const waypoints = trip.stops
        .map((s) => {
          const cityData = MOCK_CITIES.find((c) => c.name.toLowerCase() === s.cityName.toLowerCase());
          return {
            lat: s.lat || cityData?.lat || 41.9028,
            lon: s.lon || cityData?.lon || 12.4964
          };
        })
        .filter((w) => w.lat && w.lon);

      if (waypoints.length >= 2) {
        const route = await calculateRoute(waypoints);
        if (isMounted && route) {
          setRouteInfo(route);
        }
      }
    }

    fetchRouting();
    return () => { isMounted = false; };
  }, [trip?.stops]);

  if (!trip) {
    return (
      <div className="max-w-container-max mx-auto px-6 py-20 text-center space-y-4">
        <span className="material-symbols-outlined text-secondary text-5xl">wrong_location</span>
        <h2 className="font-serif text-3xl font-bold text-on-surface">Trip Not Found</h2>
        <Link to="/trips" className="inline-block px-6 py-2.5 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  const expensesTotal = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
  const remainingBudget = (trip.totalBudget || 3500) - expensesTotal;

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Header Cover Banner */}
      <header className="relative w-full h-[45vh] min-h-[320px] bg-on-surface overflow-hidden">
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
              <Link to={`/trips/${trip.id}`} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper">
                <span className="material-symbols-outlined text-base">edit</span>
                Edit in Builder
              </Link>
              <Link to={`/globe/trip/${trip.shareId}`} className="flex items-center gap-1.5 px-4 py-2 bg-black/40 backdrop-blur border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white hover:text-on-surface transition">
                <span className="material-symbols-outlined text-base">share</span>
                Share Link
              </Link>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span>{trip.startDate} &mdash; {trip.endDate}</span>
              <span>&bull;</span>
              <span>{trip.stops?.length || 0} Destination Stops</span>
              <span>&bull;</span>
              <span className="text-primary-fixed">Read-Only View</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              {trip.title}
            </h1>

            <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
              "{trip.description}"
            </p>
          </div>

        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-10">
        
        {/* Metric Summary Ribbon */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface border border-outline-variant p-6 rounded-sm shadow-paper">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary block">Total Budget</span>
            <span className="font-serif text-2xl font-bold text-on-surface">${(trip.totalBudget || 3500).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary block">Logged Expenses</span>
            <span className="font-serif text-2xl font-bold text-on-surface">${expensesTotal.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary block">Remaining Cap</span>
            <span className={`font-serif text-2xl font-bold ${remainingBudget >= 0 ? 'text-on-surface' : 'text-error'}`}>
              ${remainingBudget.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary block">Total Route</span>
            <span className="font-serif text-2xl font-bold text-primary">
              {routeInfo ? `${routeInfo.distanceKm} km` : `${trip.stops?.length || 0} Cities`}
            </span>
          </div>
        </section>

        {/* Interactive Map Visualizer */}
        <TripMap stops={trip.stops} routeInfo={routeInfo} />

        {/* View Mode Toggle Bar */}
        <div className="flex justify-between items-center border-b border-outline-variant pb-4">
          <h2 className="font-serif text-2xl font-bold text-on-surface">Itinerary Schedule</h2>
          
          <div className="flex border border-outline-variant rounded-sm overflow-hidden p-0.5 bg-surface-container-low">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition ${
                viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-on-surface'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition ${
                viewMode === 'calendar' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-on-surface'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* LIST VIEW MODE */}
        {viewMode === 'list' && (
          <div className="space-y-8">
            {trip.stops?.map((stop, stopIdx) => (
              <div key={stop.id || stopIdx} className="bg-surface border border-outline-variant rounded-sm p-6 lg:p-8 shadow-paper space-y-6">
                
                <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                  <div className="flex items-center gap-4">
                    <img src={stop.image || 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80'} alt={stop.cityName} className="w-12 h-12 rounded-sm object-cover border border-outline-variant" />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary block">
                        Stop {stopIdx + 1} &bull; {stop.country}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-on-surface">{stop.cityName}</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {stop.activities?.map((act, actIdx) => (
                    <div key={act.id || actIdx} className="flex items-start gap-4 p-4 bg-surface-container-low border border-outline-variant rounded-sm">
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
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* CALENDAR OVERVIEW MODE */}
        {viewMode === 'calendar' && (
          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-6">
            <h3 className="font-serif text-xl font-bold text-on-surface">Daily Calendar Grid</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trip.stops?.map((stop, sIdx) => (
                <div key={sIdx} className="p-4 bg-surface-container-low border border-outline-variant rounded-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                    <span className="font-serif font-bold text-on-surface">{stop.cityName}</span>
                    <span className="text-[10px] font-mono text-secondary">{stop.arrivalDate}</span>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {stop.activities?.map((act, aIdx) => (
                      <li key={aIdx} className="flex justify-between p-2 bg-surface border border-outline-variant rounded-sm">
                        <span className="font-medium text-on-surface">{act.title}</span>
                        <span className="font-mono text-primary">${act.cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
