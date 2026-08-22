import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, DollarSign, Share2, Sparkles, ArrowRight, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { MOCK_CITIES } from '../data/mockData';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-12">
      
      {/* HERO SECTION - High-end Editorial Broadsheet */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 7 Columns - Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-container border border-outline-variant/60 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Editorial Horizon — MERN Stack Master
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.1]">
                Master Multi-City Journeys with Editorial Precision.
              </h1>

              <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-light">
                Unify multi-city dates, day-wise activity itineraries, real-time expense calculations, and visual calendars into a high-end broadsheet travel platform.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Link
                  to="/register"
                  className="inline-flex justify-center items-center space-x-2 px-8 py-3.5 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-primary-container transition shadow-paper"
                >
                  <span>Start Planning Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/globe/trip/euro-summer-2026"
                  className="inline-flex justify-center items-center space-x-2 px-6 py-3.5 bg-surface-container border border-outline/50 text-on-surface font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-surface-container-high transition"
                >
                  <Share2 className="w-4 h-4 text-tertiary" />
                  <span>View Sample Public Trip</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-outline-variant/40">
                <div>
                  <span className="font-serif text-2xl font-bold text-on-surface block">100%</span>
                  <span className="text-[11px] uppercase tracking-wider text-outline font-medium">MERN Architecture</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-on-surface block">Sub-s</span>
                  <span className="text-[11px] uppercase tracking-wider text-outline font-medium">Day-Wise Itinerary</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-on-surface block">1-Click</span>
                  <span className="text-[11px] uppercase tracking-wider text-outline font-medium">Public Itinerary Copy</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns - High Resolution Hero Artwork */}
            <div className="lg:col-span-5 relative">
              <div className="relative border border-outline/40 p-2 bg-surface shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80"
                  alt="Rome Colosseum Editorial"
                  className="w-full h-[420px] object-cover rounded-none"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur border border-outline-variant/60 p-4 shadow-paper">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary block">
                        Featured Itinerary
                      </span>
                      <h4 className="font-serif text-base font-bold text-on-surface">
                        Rome & Florence Grand Excursion
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-primary/10 text-primary border border-primary/30 rounded-sm">
                      7 Days
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Built for Modern Travelers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
              Every Travel Element in Harmonious Alignment.
            </h2>
            <p className="text-sm text-on-surface-variant">
              No more juggling multiple apps, spreadsheets, or lost notes. GlobeTrotter unifies your itinerary, schedule, and expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-surface p-8 border border-outline/40 shadow-paper space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-sm">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface">
                Multi-City Itinerary Builder
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Organize stops across multiple cities, assign travel date ranges, schedule time slots, and reorder activities effortlessly.
              </p>
            </div>

            <div className="bg-surface p-8 border border-outline/40 shadow-paper space-y-4">
              <div className="w-12 h-12 bg-tertiary/10 text-tertiary flex items-center justify-center rounded-sm">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface">
                Real-Time Expense Analytics
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Track transport, lodging, activities, and food expenses against custom caps with visual breakdown charts and over-budget warnings.
              </p>
            </div>

            <div className="bg-surface p-8 border border-outline/40 shadow-paper space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-sm">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface">
                Public Sharing & 1-Click Clone
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Publish beautiful read-only share links for your travel itineraries and let other travelers clone them into their account.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED DESTINATIONS CATALOG TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-1">
              Curated Destination Catalog
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Discover World-Class Cities & Activities
            </h2>
          </div>
          <Link 
            to="/discover/destinations" 
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-primary hover:underline inline-flex items-center space-x-1"
          >
            <span>Explore All Cities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CITIES.slice(0, 3).map(city => (
            <div key={city.id} className="bg-surface border border-outline/40 group overflow-hidden shadow-paper hover:border-primary transition">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-none"
                />
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-surface/90 text-[10px] font-semibold uppercase tracking-wider text-on-surface border border-outline/30 rounded-sm">
                  {city.country}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl font-bold text-on-surface">
                    {city.name}
                  </h3>
                  <span className="text-xs text-outline capitalize font-medium">
                    {city.costIndex} Cost
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {city.description}
                </p>
                <Link
                  to={`/discover/destinations`}
                  className="inline-block text-xs font-semibold uppercase tracking-wider text-primary pt-2 hover:underline"
                >
                  Explore Activities &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-container-high border border-outline/40 p-10 md:p-16 text-center space-y-6 relative overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface max-w-2xl mx-auto">
            Ready to Plan Your Next Grand Excursion?
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
            Join thousands of travelers who use GlobeTrotter for personalized, stress-free multi-city travel planning.
          </p>
          <div>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-primary-container transition shadow-paper"
            >
              <span>Create Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
