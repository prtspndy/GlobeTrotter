import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrip();
  const [filterTab, setFilterTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterTab === 'all') return true;
    if (filterTab === 'upcoming') return trip.status === 'upcoming';
    if (filterTab === 'drafts') return trip.status === 'draft';
    if (filterTab === 'completed') return trip.status === 'completed';
    return true;
  });

  return (
    <div className="w-full pb-20">
      
      {/* Header Section */}
      <section className="bg-surface-container-low border-b border-outline-variant py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-1">
              Personal Portfolio
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
              My Travel Journeys
            </h1>
            <p className="text-sm text-secondary mt-1">
              Browse, manage, and edit your multi-city travel itineraries.
            </p>
          </div>

          <Link
            to="/trips/create"
            className="bg-primary hover:bg-primary-container text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm flex items-center gap-2 transition shadow-paper"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Plan new trip
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-outline-variant pb-4">
          
          {/* Tabs */}
          <div className="flex gap-2 border-b sm:border-b-0 border-outline-variant pb-2 sm:pb-0">
            {['all', 'upcoming', 'drafts', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition ${
                  filterTab === tab
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter trips by title..."
              className="w-full bg-surface border border-outline-variant rounded-sm py-2 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

        </div>

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-outline-variant p-8 space-y-4">
            <span className="material-symbols-outlined text-secondary text-5xl">card_travel</span>
            <h3 className="font-serif text-2xl font-bold text-on-surface">No Trips Found</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              No trips match your search criteria. Create your first itinerary to begin planning!
            </p>
            <Link
              to="/trips/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold text-xs uppercase tracking-wider rounded-sm"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Create Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => {
              const tripExpensesTotal = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
              const budgetPercent = Math.min(100, Math.round((tripExpensesTotal / (trip.totalBudget || 1)) * 100));

              return (
                <div key={trip.id} className="group bg-surface border border-outline-variant rounded-sm hover:shadow-paper transition overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-52 relative overflow-hidden">
                      <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface border border-outline-variant rounded-sm">
                        {trip.visibility}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-on-surface/80 text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                        {trip.stops?.length || 0} Destination Stops
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest block mb-1 font-semibold">
                            {trip.startDate} — {trip.endDate}
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-on-surface">
                            <Link to={`/trips/${trip.id}`} className="hover:text-primary transition">
                              {trip.title}
                            </Link>
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                        {trip.description}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs font-mono text-secondary">
                          <span>Expenses</span>
                          <span>${tripExpensesTotal.toLocaleString()} / ${trip.totalBudget.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${budgetPercent}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-outline-variant/40 flex justify-between items-center text-xs font-semibold uppercase tracking-wider mt-4">
                    <div className="flex gap-4">
                      <Link to={`/trips/${trip.id}`} className="text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">map</span>
                        Builder
                      </Link>
                      <Link to={`/trips/${trip.id}/budget`} className="text-secondary hover:text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">payments</span>
                        Budget
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/globe/trip/${trip.shareId}`} className="text-tertiary hover:underline p-1" title="Share link">
                        <span className="material-symbols-outlined text-base">share</span>
                      </Link>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="text-secondary hover:text-error transition p-1"
                        title="Delete trip"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
