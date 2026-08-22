import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import ShareTripModal from '../components/modals/ShareTripModal';
import { Share2, Search, Plus, MapPin, Calendar, CreditCard } from 'lucide-react';

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrip();
  const [filterTab, setFilterTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShareTrip, setActiveShareTrip] = useState(null);

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
              Browse, manage, and share your multi-city travel itineraries.
            </p>
          </div>

          <Link
            to="/trips/create"
            className="bg-primary hover:bg-primary-container text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center gap-2 transition shadow-paper"
          >
            <Plus className="w-4 h-4" />
            <span>Plan new trip</span>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
        
        {/* Sleek Modern Search & Filter Ribbon */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-surface border border-outline-variant p-3.5 rounded-2xl shadow-paper">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'upcoming', 'drafts', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition cursor-pointer ${
                  filterTab === tab
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Premium Search Input Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search travel journeys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/70 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-on-surface placeholder:text-secondary/70 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="bg-surface border border-outline-variant p-12 text-center rounded-2xl space-y-4 shadow-paper">
            <span className="material-symbols-outlined text-4xl text-secondary">explore_off</span>
            <h3 className="font-serif text-2xl font-bold text-on-surface">No Journeys Found</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              No trip plans match your selected criteria. Create a new multi-city itinerary to get started.
            </p>
            <Link
              to="/trips/create"
              className="inline-block bg-primary text-white font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl"
            >
              Plan Trip Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => {
              const tripExpensesTotal = trip.expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;
              const budgetPercent = Math.min(100, Math.round((tripExpensesTotal / (trip.totalBudget || 2000)) * 100));

              return (
                <div
                  key={trip.id}
                  className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-paper hover:border-primary transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image Header */}
                    <div className="relative h-44 overflow-hidden bg-on-surface">
                      <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                      />
                      <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest bg-black/60 backdrop-blur text-white border border-white/20 rounded-lg">
                        {trip.status || 'planning'}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
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
                          <span>${tripExpensesTotal.toLocaleString()} / ${(trip.totalBudget || 2000).toLocaleString()}</span>
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
                      <button
                        onClick={() => setActiveShareTrip(trip)}
                        className="text-tertiary hover:text-primary transition p-1 cursor-pointer"
                        title="Share full trip plan"
                      >
                        <Share2 className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="text-secondary hover:text-error transition p-1 cursor-pointer"
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
