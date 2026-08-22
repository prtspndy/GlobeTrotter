import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Compass, Calendar, DollarSign, Sparkles, MapPin, ArrowRight, Eye, Trash2, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';
import ShareTripModal from '../components/modals/ShareTripModal';

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips, deleteTrip } = useTrip();
  const [activeShareTrip, setActiveShareTrip] = useState(null);

  const totalSpent = trips.reduce((acc, t) => {
    const tripExpenses = t.expenses?.reduce((eAcc, e) => eAcc + Number(e.amount), 0) || 0;
    return acc + tripExpenses;
  }, 0);

  const totalDestinations = trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0);
  const featuredTrip = trips[0];

  return (
    <div className="w-full pb-20">
      
      {/* Hero Header Section */}
      <section className="relative w-full bg-surface-container-low border-b border-outline-variant py-12 lg:py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold block">
              Good to see you
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface leading-tight">
              Ready for your next adventure, {user?.name || 'Traveler'}?
            </h1>
            <p className="text-base text-on-surface-variant font-light">
              Your journeys, destinations and itineraries — all in one place.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/trips/create"
              className="bg-primary hover:bg-primary-container text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm flex items-center gap-2 transition shadow-paper"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Plan a new trip
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-12">
        
        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/trips/create"
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">travel_explore</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Plan a trip</span>
          </Link>

          <Link
            to="/trips"
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">map</span>
            <span className="text-xs font-semibold uppercase tracking-wider">My trips ({trips.length})</span>
          </Link>

          <Link
            to="/discover/destinations"
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">location_city</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Destinations</span>
          </Link>

          <Link
            to="/profile"
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">manage_accounts</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Preferences</span>
          </Link>
        </section>

        {/* Dynamic Metric Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <div className="flex justify-between items-center text-secondary">
              <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">Active Trips</span>
              <span className="material-symbols-outlined">flight_takeoff</span>
            </div>
            <p className="font-serif text-3xl font-bold text-on-surface">{trips.length}</p>
            <span className="text-[11px] text-secondary">Broadsheet itineraries planned</span>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <div className="flex justify-between items-center text-secondary">
              <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">Cities Scheduled</span>
              <span className="material-symbols-outlined">location_city</span>
            </div>
            <p className="font-serif text-3xl font-bold text-on-surface">{totalDestinations}</p>
            <span className="text-[11px] text-secondary">Stops in your multi-city routes</span>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <div className="flex justify-between items-center text-secondary">
              <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">Total Expenses</span>
              <span className="material-symbols-outlined">payments</span>
            </div>
            <p className="font-serif text-3xl font-bold text-on-surface">${totalSpent.toLocaleString()}</p>
            <span className="text-[11px] text-secondary">Estimated total travel spend</span>
          </div>
        </section>

        {/* Featured Trip Highlight */}
        {featuredTrip && (
          <section className="bg-surface border border-outline-variant rounded-sm overflow-hidden shadow-paper">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] bg-on-surface">
                <img
                  src={featuredTrip.coverImage}
                  alt={featuredTrip.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 text-xs text-white uppercase tracking-wider font-semibold border border-white/20">
                  Featured Journey
                </div>
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block">
                    {featuredTrip.startDate} — {featuredTrip.endDate}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-on-surface">
                    {featuredTrip.title}
                  </h2>
                  <p className="text-xs text-secondary leading-relaxed">
                    {featuredTrip.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-outline-variant">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-secondary">Route Stops:</span>
                    <span className="font-semibold text-on-surface">
                      {featuredTrip.stops?.map(s => s.cityName).join(' → ')}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/trips/${featuredTrip.id}`}
                      className="flex-1 text-center bg-primary hover:bg-primary-container text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-sm transition shadow-paper"
                    >
                      Open Itinerary
                    </Link>
                    <button
                      onClick={() => setActiveShareTrip(featuredTrip)}
                      className="px-4 py-3 border border-outline-variant text-on-surface hover:border-primary font-semibold text-xs uppercase tracking-wider rounded-sm transition flex items-center justify-center gap-1 cursor-pointer"
                      title="Share trip plan"
                    >
                      <Share2 className="w-4 h-4 text-primary" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Journeys Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-outline-variant pb-3">
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              Recent Journeys
            </h2>
            <Link to="/trips" className="text-xs font-semibold text-primary hover:underline uppercase tracking-wider">
              View All Trips &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => {
              const tripExpenses = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
              const budgetPercent = Math.min(100, Math.round((tripExpenses / (trip.totalBudget || 2000)) * 100));

              return (
                <div
                  key={trip.id}
                  className="bg-surface border border-outline-variant rounded-sm overflow-hidden shadow-paper hover:border-primary transition flex flex-col justify-between group"
                >
                  <div className="relative h-44 overflow-hidden bg-on-surface">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    />
                    <div className="absolute top-3 right-3 bg-surface/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-on-surface border border-outline-variant rounded-sm">
                      {trip.visibility}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-xl font-bold text-on-surface">
                          <Link to={`/trips/${trip.id}`} className="hover:text-primary transition">
                            {trip.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setActiveShareTrip(trip)}
                            className="text-tertiary hover:text-primary transition p-1 cursor-pointer"
                            title="Share trip plan"
                          >
                            <Share2 className="w-4 h-4 text-primary" />
                          </button>
                          <button
                            onClick={() => deleteTrip(trip.id)}
                            className="text-secondary hover:text-error transition p-1 cursor-pointer"
                            title="Delete trip"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-secondary font-medium">
                        {trip.startDate} — {trip.endDate}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-secondary mb-1">
                        <span>Expense Budget</span>
                        <span>{budgetPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${budgetPercent}%` }} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant text-xs font-semibold uppercase tracking-wider">
                      <Link to={`/trips/${trip.id}`} className="text-primary hover:underline flex items-center gap-1">
                        Itinerary &rarr;
                      </Link>
                      <Link to={`/trips/${trip.id}/budget`} className="text-secondary hover:text-on-surface">
                        Budget
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Share Trip Modal */}
      {activeShareTrip && (
        <ShareTripModal
          isOpen={!!activeShareTrip}
          onClose={() => setActiveShareTrip(null)}
          trip={activeShareTrip}
        />
      )}

    </div>
  );
}
