import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Calendar, MapPin, DollarSign, Share2, Trash2, Eye, Compass } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrip();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTrips = trips.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter || t.visibility === filter;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
            Travel Library
          </span>
          <h1 className="font-serif text-3xl font-bold text-on-surface">
            My Travel Itineraries
          </h1>
        </div>

        <Link
          to="/trips/create"
          className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Plan New Trip</span>
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {['all', 'planning', 'completed', 'public', 'private'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm border transition ${
                filter === tab 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-surface border-outline/40 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trips by title..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <div className="bg-surface border border-outline/40 p-12 text-center space-y-4 shadow-paper">
          <Compass className="w-12 h-12 text-outline mx-auto" />
          <h3 className="font-serif text-xl font-bold text-on-surface">
            No Trips Match Your Query
          </h3>
          <p className="text-xs text-on-surface-variant">
            Create a new multi-city travel plan or clear your search filter.
          </p>
          <Link
            to="/trips/create"
            className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
          >
            Create New Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map(trip => {
            const tripExpensesTotal = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;

            return (
              <div key={trip.id} className="bg-surface border border-outline/40 shadow-paper overflow-hidden flex flex-col justify-between group hover:border-primary transition">
                
                {/* Cover Image */}
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.coverImage} 
                      alt={trip.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-none"
                    />
                    <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                      {trip.visibility}
                    </div>
                    <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                      {trip.stops?.length || 0} Cities
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-2 text-[11px] text-outline font-semibold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{trip.startDate} &mdash; {trip.endDate}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-on-surface">
                      <Link to={`/trips/${trip.id}`} className="hover:text-primary transition">
                        {trip.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-on-surface-variant line-clamp-2">
                      {trip.description}
                    </p>

                    <div className="pt-2 flex justify-between items-center text-xs border-t border-outline-variant/40">
                      <span className="text-outline font-medium">Budget:</span>
                      <span className="font-semibold text-on-surface">
                        ${tripExpensesTotal.toLocaleString()} / ${trip.totalBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-surface-container-low border-t border-outline-variant/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                  <div className="flex space-x-3">
                    <Link to={`/trips/${trip.id}`} className="text-primary hover:underline flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                    <Link to={`/trips/${trip.id}/budget`} className="text-on-surface-variant hover:text-primary transition flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Budget</span>
                    </Link>
                    <Link to={`/globe/trip/${trip.shareId}`} className="text-tertiary hover:underline flex items-center space-x-1">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </Link>
                  </div>

                  <button 
                    onClick={() => deleteTrip(trip.id)}
                    className="text-on-surface/40 hover:text-error transition"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
