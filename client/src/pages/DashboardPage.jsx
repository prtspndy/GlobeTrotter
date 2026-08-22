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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-surface-container-high border border-outline/40 p-8 sm:p-10 shadow-paper relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
            Traveler Dashboard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
            Welcome Back, {user?.name || 'Traveler'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            You have <strong className="text-on-surface">{trips.length} active trips</strong> planned across <strong className="text-on-surface">{totalDestinations} destination stops</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/trips/create"
            className="flex items-center space-x-2 px-5 py-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Total Planned Trips</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">{trips.length}</span>
            <Compass className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Destination Stops</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">{totalDestinations}</span>
            <MapPin className="w-5 h-5 text-tertiary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Total Expenses Logged</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">${totalSpent.toLocaleString()}</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Account Tier</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-2xl font-bold text-on-surface uppercase">Broadsheet</span>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-primary/10 text-primary border border-primary/30 rounded-sm">
              Pro
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 cols Trips, Right 4 cols Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column - Active Trips */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center border-b border-outline-variant/60 pb-3">
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              Upcoming & Active Trips
            </h2>
            <Link to="/trips" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
              View All ({trips.length}) &rarr;
            </Link>
          </div>

          <div className="space-y-6">
            {trips.map(trip => {
              const tripExpensesTotal = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
              const budgetPercent = Math.min(100, Math.round((tripExpensesTotal / (trip.totalBudget || 1)) * 100));

              return (
                <div key={trip.id} className="bg-surface border border-outline/40 shadow-paper overflow-hidden group hover:border-primary transition">
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    
                    {/* Image Thumbnail */}
                    <div className="md:col-span-4 h-48 md:h-auto relative overflow-hidden">
                      <img 
                        src={trip.coverImage} 
                        alt={trip.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-none"
                      />
                      <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-outline/30 rounded-sm">
                        {trip.visibility}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 text-[11px] text-outline font-semibold uppercase tracking-wider mb-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{trip.startDate} &mdash; {trip.endDate}</span>
                          <span>&bull;</span>
                          <span>{trip.stops?.length || 0} Stops</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-on-surface">
                          <Link to={`/trips/${trip.id}`} className="hover:text-primary transition">
                            {trip.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                          {trip.description}
                        </p>
                      </div>

                      {/* Budget Mini Progress */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider">
                          <span className="text-on-surface-variant">Expense Allocation</span>
                          <span className={budgetPercent > 90 ? "text-error" : "text-primary"}>
                            ${tripExpensesTotal.toLocaleString()} / ${trip.totalBudget.toLocaleString()} ({budgetPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${budgetPercent > 90 ? 'bg-error' : 'bg-primary'}`} 
                            style={{ width: `${budgetPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40 text-xs font-semibold uppercase tracking-wider">
                        <div className="flex space-x-4">
                          <Link to={`/trips/${trip.id}`} className="text-primary hover:underline flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Itinerary</span>
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

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Recommended Destinations & Quick Tools */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-surface p-6 border border-outline/40 shadow-paper space-y-4">
            <h3 className="font-serif text-lg font-bold text-on-surface border-b border-outline-variant/60 pb-2">
              Recommended Destinations
            </h3>

            <div className="space-y-4">
              {MOCK_CITIES.slice(0, 3).map(city => (
                <div key={city.id} className="flex items-center space-x-3 group">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-14 h-14 object-cover border border-outline/30 rounded-none group-hover:opacity-90"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-bold text-on-surface group-hover:text-primary transition">
                      {city.name}, {city.country}
                    </h4>
                    <span className="text-[11px] text-outline uppercase font-medium">
                      Popularity: {city.popularity}%
                    </span>
                  </div>
                  <Link
                    to="/discover/destinations"
                    className="p-1.5 bg-surface-container border border-outline/40 rounded-sm hover:bg-primary hover:text-white transition text-xs"
                  >
                    + Add
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
