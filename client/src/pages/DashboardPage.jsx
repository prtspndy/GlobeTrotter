import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Compass, Calendar, DollarSign, Sparkles, MapPin, ArrowRight, Eye, Trash2, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips, deleteTrip } = useTrip();

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
              Ready for your next adventure, {user?.name?.split(' ')[0] || 'Traveler'}?
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
            to="/discover/destinations"
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">map</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Explore cities</span>
          </Link>

          <Link
            to="/discover/activities"
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">local_activity</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Find activities</span>
          </Link>

          <Link
            to={featuredTrip ? `/trips/${featuredTrip.id}/calendar` : '/trips'}
            className="flex flex-col items-center justify-center gap-3 py-6 border border-outline-variant rounded-sm bg-surface hover:bg-surface-container-low transition text-on-surface shadow-paper"
          >
            <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
            <span className="text-xs font-semibold uppercase tracking-wider">View calendar</span>
          </Link>
        </section>

        {/* Featured Next Adventure */}
        {featuredTrip && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-surface border border-outline-variant p-6 lg:p-8 rounded-sm shadow-paper">
            <div className="md:col-span-8 flex flex-col justify-center space-y-6">
              <div>
                <span className="font-label-caps text-xs text-secondary uppercase tracking-widest block mb-1">
                  Next Adventure
                </span>
                <h2 className="font-serif text-3xl font-bold text-on-surface">
                  {featuredTrip.title}
                </h2>
              </div>

              {/* Dynamic Route Visualization */}
              <div className="flex items-center gap-2 overflow-x-auto py-2">
                {featuredTrip.stops?.map((stop, idx) => (
                  <React.Fragment key={stop.id || idx}>
                    <div className="flex flex-col items-center text-center min-w-[70px]">
                      <span className="text-xs font-semibold text-on-surface">{stop.cityName}</span>
                    </div>
                    {idx < featuredTrip.stops.length - 1 && (
                      <div className="flex-1 min-w-[50px] border-t-2 border-dashed border-primary relative my-auto">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 material-symbols-outlined text-primary text-sm bg-surface px-1">
                          {idx % 2 === 0 ? 'flight' : 'directions_railway'}
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex gap-8 border-l-2 border-primary pl-4">
                <div>
                  <p className="font-label-caps text-xs text-secondary uppercase mb-1">Dates</p>
                  <p className="text-sm font-medium text-on-surface">{featuredTrip.startDate} — {featuredTrip.endDate}</p>
                </div>
                <div>
                  <p className="font-label-caps text-xs text-secondary uppercase mb-1">Destinations</p>
                  <p className="text-sm font-medium text-on-surface">{featuredTrip.stops?.length || 0} stops planned</p>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Link
                  to={`/trips/${featuredTrip.id}`}
                  className="border border-on-surface text-on-surface hover:bg-surface-container-low text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-sm transition"
                >
                  Continue planning
                </Link>
                <Link
                  to={`/globe/trip/${featuredTrip.shareId}`}
                  className="bg-surface-container border border-outline-variant text-tertiary hover:bg-tertiary hover:text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-sm transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">share</span>
                  Share
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 h-[280px]">
              <img
                src={featuredTrip.coverImage}
                alt={featuredTrip.title}
                className="w-full h-full object-cover rounded-sm border border-outline-variant"
              />
            </div>
          </section>
        )}

        {/* Trips Catalog Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-outline-variant pb-3">
            <div>
              <h2 className="font-serif text-2xl font-bold text-on-surface">Your Trips</h2>
              <p className="text-xs text-secondary">Manage and customize your itineraries</p>
            </div>
            <Link to="/trips" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
              View all ({trips.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips.map((trip) => {
              const tripExpensesTotal = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
              const budgetPercent = Math.min(100, Math.round((tripExpensesTotal / (trip.totalBudget || 1)) * 100));

              return (
                <div key={trip.id} className="group border border-outline-variant rounded-sm bg-surface hover:shadow-paper transition overflow-hidden flex flex-col">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
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
                        <button
                          onClick={() => deleteTrip(trip.id)}
                          className="text-secondary hover:text-error transition p-1"
                          title="Delete trip"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
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
    </div>
  );
}
