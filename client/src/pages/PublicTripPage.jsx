import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';

const CITY_PHOTO_MAP = {
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  tokyo: '/tokyo_city.jpg',
  florence: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80',
  kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  amsterdam: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
  barcelona: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80'
};

function getStopImage(stop) {
  if (stop?.image && typeof stop.image === 'string' && stop.image.trim() !== '') {
    return stop.image;
  }
  const lower = (stop?.cityName || '').toLowerCase();
  for (const key in CITY_PHOTO_MAP) {
    if (lower.includes(key)) return CITY_PHOTO_MAP[key];
  }
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
}

export default function PublicTripPage() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const { trips, clonePublicTrip } = useTrip();
  const { isAuthenticated } = useAuth();

  const [copied, setCopied] = useState(false);

  // Find trip by shareId or default sample
  const trip = trips.find((t) => t.shareId === shareId) || {
    id: 'sample-euro',
    shareId: 'euro-summer-2026',
    title: 'European Summer Escape',
    startDate: '2026-06-12',
    endDate: '2026-06-24',
    description: 'An editorial 7-day excursion through classical Italian monuments, Tuscan vineyards, and Renaissance masterpieces.',
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    stops: [
      {
        id: 'stop-1',
        cityName: 'Rome',
        country: 'Italy',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
        activities: [
          { title: 'Colosseum & Roman Forum Tour', category: 'Sightseeing' },
          { title: 'Trastevere Culinary Walking Excursion', category: 'Food & Dining' }
        ]
      },
      {
        id: 'stop-2',
        cityName: 'Florence',
        country: 'Italy',
        image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80',
        activities: [
          { title: 'Uffizi Gallery Renaissance Tour', category: 'Culture' },
          { title: 'Sunset at Piazzale Michelangelo', category: 'Sightseeing' }
        ]
      }
    ]
  };

  const coverPhoto = trip.coverImage || 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloneTrip = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    const cloned = clonePublicTrip(trip);
    navigate(`/trips/${cloned.id}`);
  };

  return (
    <div className="w-full bg-surface pb-24">
      
      {/* Hero Section with Cover Image */}
      <section className="relative w-full h-[65vh] min-h-[450px] flex flex-col justify-end bg-on-surface overflow-hidden">
        <img
          src={coverPhoto}
          alt={trip.title}
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/40 to-transparent" />

        <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full space-y-4 text-white">
          
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1 rounded-sm text-xs font-mono border border-white/30 w-fit">
            <span>{trip.stops?.length || 0} DESTINATION STOPS</span>
            <span>&bull;</span>
            <span>PUBLIC ITINERARY</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            {trip.title}
          </h1>

          <p className="font-mono text-sm text-white/90">
            {trip.startDate} &mdash; {trip.endDate} &bull; Created with GlobeTrotter
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleCloneTrip}
              className="bg-primary hover:bg-primary-container text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition shadow-paper flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">content_copy</span>
              Clone Itinerary to My Account
            </button>

            <button
              onClick={handleCopyLink}
              className="bg-surface/20 backdrop-blur border border-white/40 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3.5 rounded-sm hover:bg-surface hover:text-on-surface transition flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">share</span>
              {copied ? 'Link Copied to Clipboard!' : 'Copy Share Link'}
            </button>
          </div>

        </div>
      </section>

      {/* Story & Route Overview */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-12">
        
        <div className="max-w-3xl space-y-4">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-semibold">
            Trip Story
          </span>
          <p className="font-serif text-xl md:text-2xl text-on-surface leading-relaxed">
            "{trip.description}"
          </p>
        </div>

        {/* Route Nodes */}
        <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-4">
          <h2 className="font-label-caps text-xs text-secondary uppercase tracking-widest block font-semibold">
            Route Nodes
          </h2>

          <div className="flex items-center gap-3 overflow-x-auto py-2">
            {trip.stops?.map((stop, idx) => (
              <React.Fragment key={stop.id || idx}>
                <div className="flex flex-col items-center min-w-[100px] text-center space-y-1">
                  <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden mx-auto">
                    <img
                      src={getStopImage(stop)}
                      alt={stop.cityName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-serif text-sm font-bold text-on-surface">{stop.cityName}</span>
                  <span className="text-[10px] text-secondary">{stop.country}</span>
                </div>
                {idx < (trip.stops.length - 1) && (
                  <div className="flex-1 min-w-[50px] border-t border-dashed border-primary relative my-auto">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 material-symbols-outlined text-primary text-xs bg-surface px-1">
                      flight
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Destination Cards */}
        <div className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-on-surface">Destination Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trip.stops?.map((stop, idx) => (
              <div key={stop.id || idx} className="bg-surface border border-outline-variant rounded-sm overflow-hidden shadow-paper flex flex-col justify-between">
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={getStopImage(stop)}
                    alt={stop.cityName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface border border-outline-variant rounded-sm">
                    Stop {idx + 1}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-on-surface">{stop.cityName}, {stop.country}</h3>
                  
                  <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary block">
                      Scheduled Experiences:
                    </span>
                    <ul className="space-y-1.5 text-xs text-on-surface">
                      {stop.activities?.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                          <span>{act.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
