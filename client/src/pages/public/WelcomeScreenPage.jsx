import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Map, Compass, Wallet, ArrowRight, Check } from 'lucide-react';

export default function WelcomeScreenPage() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container font-sans overflow-x-hidden">
      
      {/* Top Navigation */}
      <nav className="bg-background/95 backdrop-blur w-full z-50 border-b border-outline-variant/40 sticky top-0">
        <div className="flex justify-between items-center w-full px-4 sm:px-8 md:px-16 py-4 max-w-7xl mx-auto">
          <Link to="/" className="font-serif text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-paper">
              GT
            </div>
            <span>GlobeTrotter</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="text-xs sm:text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
            >
              Already a traveler? Log in
            </Link>
            <Link 
              to="/register"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="flex-grow relative overflow-hidden">
        
        {/* Immersive Background Layer - Desktop */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <div 
            className="absolute inset-y-0 right-0 w-3/4 h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/image_wecome.png')` }}
          ></div>
          <div className="absolute inset-0 bg-hero-overlay z-10 w-full h-full"></div>
        </div>

        {/* Immersive Background Layer - Mobile */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <div 
            className="absolute inset-x-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url('/images/image_wecome.png')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10 w-full h-full"></div>
        </div>

        {/* Content Grid */}
        <div className="relative z-20 w-full px-4 sm:px-8 md:px-16 py-10 sm:py-16 md:py-24 max-w-7xl mx-auto min-h-[80vh] flex flex-col md:flex-row items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="w-full md:w-5/12 flex flex-col gap-5 sm:gap-6 md:pr-12 pt-4 md:pt-0 text-left">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-[11px] sm:text-xs font-semibold text-primary tracking-widest uppercase">
                Personalized Travel Planning
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.15] tracking-tight">
              Plan the journey.<br />
              <span className="text-secondary font-serif">Not just the destination.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-secondary max-w-md mt-1 sm:mt-2 font-normal leading-relaxed">
              Build multi-city itineraries, discover experiences, manage your budget, and keep every part of your journey beautifully organized.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-4 sm:mt-6">
              <Link 
                to="/register"
                className="inline-flex justify-center items-center px-8 py-3.5 bg-primary text-white font-medium text-xs tracking-wider uppercase rounded-sm transition hover:bg-primary-container w-full sm:w-auto shadow-paper"
              >
                <span>Start planning</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                to="/discover/destinations"
                className="inline-flex justify-center items-center px-8 py-3.5 bg-transparent border border-secondary text-on-surface font-medium text-xs tracking-wider uppercase rounded-sm transition hover:border-primary hover:text-primary w-full sm:w-auto"
              >
                Explore how it works
              </Link>
            </div>

            {/* Trust Line */}
            <div className="mt-4 sm:mt-6 flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-secondary uppercase tracking-wider">
                No complicated spreadsheets. No scattered travel notes.
              </span>
            </div>

          </div>

          {/* Right Column: Asymmetric Floating UI (Desktop & Tablet) */}
          <div className="w-full md:w-7/12 relative mt-12 md:mt-0 h-[460px] md:h-[500px] hidden md:block">
            
            {/* Floating Map/Path SVG */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg className="w-full h-full" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 250 C 200 150, 300 350, 450 100" stroke="#a93100" strokeDasharray="4 4" strokeWidth="1.5"></path>
                <circle cx="100" cy="250" fill="#a93100" r="4"></circle>
                <circle cx="210" cy="210" fill="#a93100" r="4"></circle>
                <circle cx="330" cy="260" fill="#a93100" r="4"></circle>
                <circle cx="450" cy="100" fill="#a93100" r="4"></circle>
              </svg>
            </div>

            {/* Itinerary Card */}
            <div className="absolute top-8 md:top-12 right-6 lg:right-24 w-72 lg:w-80 bg-surface/90 backdrop-blur-md border border-outline-variant/60 rounded-lg p-5 lg:p-6 editorial-shadow z-30">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-serif text-base lg:text-lg font-bold text-on-surface">Your next adventure</h3>
                <span className="text-[10px] font-semibold text-secondary uppercase bg-surface-container-low px-2 py-1 rounded">
                  7 DAYS
                </span>
              </div>

              <div className="relative pl-6 space-y-5">
                <div className="absolute left-[7px] top-2 bottom-2 route-line-vertical z-0"></div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-surface flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Mumbai</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Departure</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-outline-variant flex-shrink-0 ml-[2px]"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Dubai</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Layover</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-outline-variant flex-shrink-0 ml-[2px]"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Rome</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">3 Nights</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-primary flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Paris</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Final Destination</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Budget Card */}
            <div className="absolute bottom-8 lg:bottom-12 left-4 lg:left-12 w-60 lg:w-64 bg-surface border border-outline-variant/60 rounded-lg p-5 editorial-shadow z-20">
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-widest mb-1">Estimated Budget</p>
              <p className="font-serif text-2xl lg:text-3xl font-bold text-on-surface">₹48,500</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-outline-variant/40">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-secondary">Within your budget</span>
              </div>
            </div>

          </div>

          {/* Right Column: Responsive Mobile Cards Version */}
          <div className="w-full mt-10 space-y-4 md:hidden">
            <div className="bg-surface border border-outline-variant/60 rounded-lg p-5 shadow-paper">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-base font-bold text-on-surface">Your Next Adventure</h3>
                <span className="text-[10px] font-bold uppercase text-secondary bg-surface-container-low px-2 py-0.5 rounded">
                  7 DAYS
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-outline uppercase text-[10px] block">Route</span>
                  <span className="font-semibold text-on-surface">Mumbai &rarr; Paris</span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[10px] block">Estimated Budget</span>
                  <span className="font-serif font-bold text-primary text-sm">₹48,500</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Anchor */}
      <footer className="bg-surface border-t border-outline-variant/40 relative z-30">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-8 md:px-16 py-6 max-w-7xl mx-auto gap-4 text-center sm:text-left">
          <div className="font-serif text-base sm:text-xl font-bold text-primary">
            Everything you need to plan a better trip
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/trips" className="group flex items-center gap-2">
              <Map className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">
                Plan
              </span>
            </Link>
            <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
            <Link to="/discover/destinations" className="group flex items-center gap-2">
              <Compass className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">
                Discover
              </span>
            </Link>
            <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
            <Link to="/trips" className="group flex items-center gap-2">
              <Wallet className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">
                Budget
              </span>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
