import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Copy, Check, DollarSign, Clock, Share2, Compass, Shield } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';

export default function PublicTripPage() {
  const { shareId } = useParams();
  const { getTrip, copyPublicTrip } = useTrip();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const trip = getTrip(shareId);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-on-surface">Shared Trip Not Found</h2>
        <p className="text-xs text-on-surface-variant">The public travel share URL is invalid or has expired.</p>
        <Link to="/" className="inline-block px-4 py-2 bg-primary text-white text-xs uppercase font-semibold">
          Go to GlobeTrotter Home
        </Link>
      </div>
    );
  }

  const handleCopyTrip = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const cloned = copyPublicTrip(trip.shareId);
    setCopied(true);
    setTimeout(() => {
      navigate(`/trips/${cloned.id}`);
    }, 800);
  };

  const totalSpent = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Read-Only Public Badge */}
      <div className="bg-surface-container-high border border-outline/40 p-4 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-paper">
        <div className="flex items-center space-x-2 text-xs uppercase font-semibold tracking-wider text-tertiary">
          <Shield className="w-4 h-4" />
          <span>Verified Public Itinerary &bull; Read-Only View</span>
        </div>

        <button
          onClick={handleCopyTrip}
          className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Cloned to Account!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Trip to My Account</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative border border-outline/40 bg-surface shadow-2xl overflow-hidden">
        <div className="h-72 sm:h-96 relative">
          <img 
            src={trip.coverImage} 
            alt={trip.title} 
            className="w-full h-full object-cover rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/95 via-on-surface/50 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-primary-fixed">
              <Calendar className="w-4 h-4" />
              <span>{trip.startDate} &mdash; {trip.endDate}</span>
              <span>&bull;</span>
              <span>{trip.stops?.length || 0} City Stops</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              {trip.title}
            </h1>
            <p className="text-xs sm:text-sm opacity-90 max-w-3xl leading-relaxed">
              {trip.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Itinerary Day-Wise Schedule */}
        <div className="lg:col-span-8 space-y-8">
          <h2 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
            Day-Wise Travel Itinerary
          </h2>

          <div className="space-y-8">
            {trip.stops?.map((stop, sIdx) => (
              <div key={stop.id} className="space-y-4">
                <div className="bg-surface-container border-l-4 border-primary p-4 rounded-r-sm">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                    City Stop {sIdx + 1} &bull; {stop.country}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-on-surface">
                    {stop.cityName}
                  </h3>
                  <span className="text-xs text-outline">{stop.startDate} to {stop.endDate}</span>
                </div>

                <div className="space-y-4 pl-4 border-l border-outline-variant/60">
                  {stop.days?.map(day => (
                    <div key={day.dayNumber} className="bg-surface border border-outline/40 p-6 shadow-paper space-y-3">
                      <div className="flex justify-between items-baseline border-b border-outline-variant/40 pb-2">
                        <h4 className="font-serif text-lg font-bold text-on-surface">
                          Day {day.dayNumber} Overview
                        </h4>
                        <span className="text-xs text-outline font-medium">{day.date}</span>
                      </div>

                      {day.notes && (
                        <p className="text-xs text-on-surface-variant italic leading-relaxed">
                          "{day.notes}"
                        </p>
                      )}

                      <div className="space-y-3 pt-2">
                        {day.activities?.map(act => (
                          <div key={act.id} className="p-4 bg-surface-container-low border border-outline/30 rounded-sm flex justify-between items-center">
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                                {act.startTime} &bull; {act.category}
                              </span>
                              <h5 className="font-serif text-base font-bold text-on-surface">{act.title}</h5>
                              <span className="text-xs text-outline flex items-center space-x-1">
                                <MapPin className="w-3 h-3 text-outline" />
                                <span>{act.locationName}</span>
                              </span>
                            </div>
                            <span className="font-serif font-bold text-sm text-primary">${act.cost}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Public Summary & Copy Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-6 sticky top-28">
            <h3 className="font-serif text-xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
              Itinerary Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-outline-variant/40">
                <span className="text-on-surface-variant">Estimated Total Cost:</span>
                <span className="font-serif font-bold text-primary text-sm">${trip.totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/40">
                <span className="text-on-surface-variant">Destination Cities:</span>
                <span className="font-semibold text-on-surface">{trip.stops?.length} Cities</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/40">
                <span className="text-on-surface-variant">Duration:</span>
                <span className="font-semibold text-on-surface">7 Days Excursion</span>
              </div>
            </div>

            <button
              onClick={handleCopyTrip}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
            >
              <Copy className="w-4 h-4" />
              <span>Clone Itinerary</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
