import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Map, Compass, Wallet } from 'lucide-react';

export default function WelcomeScreenPage() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container font-sans">
      
      {/* Top Navigation */}
      <nav className="bg-background w-full z-50 border-b border-outline-variant/40">
        <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-7xl mx-auto">
          <Link to="/" className="font-serif text-2xl font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm">
              GT
            </div>
            GlobeTrotter
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/login"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
            >
              Already a traveler? Log in
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="flex-grow relative overflow-hidden">
        
        {/* Immersive Background Layer */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <div 
            className="absolute inset-y-0 right-0 w-3/4 h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/image_wecome.png')` }}
          ></div>
          <div className="absolute inset-0 bg-hero-overlay z-10 w-full h-full"></div>
        </div>

        <div className="absolute inset-0 z-0 block md:hidden">
          <div 
            className="absolute inset-x-0 bottom-0 w-full h-2/3 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/image_wecome.png')` }}
          ></div>
          <div className="absolute inset-0 bg-hero-overlay z-10 w-full h-full"></div>
        </div>

        {/* Content Grid */}
        <div className="relative z-20 w-full px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto min-h-[85vh] flex flex-col md:flex-row items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="w-full md:w-5/12 flex flex-col gap-6 md:pr-12 pt-8 md:pt-0">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Personalized Travel Planning
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.15] tracking-tight">
              Plan the journey.<br />
              <span className="text-secondary font-serif">Not just the destination.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-secondary max-w-md mt-2 font-normal leading-relaxed">
              Build multi-city itineraries, discover experiences, manage your budget, and keep every part of your journey beautifully organized.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
              <Link 
                to="/register"
                className="inline-flex justify-center items-center px-8 py-3 bg-primary text-white font-medium text-xs tracking-wider uppercase rounded transition-colors hover:bg-primary-container w-full sm:w-auto shadow-paper"
              >
                Start planning
              </Link>
              <Link 
                to="/discover/destinations"
                className="inline-flex justify-center items-center px-8 py-3 bg-transparent border border-secondary text-on-surface font-medium text-xs tracking-wider uppercase rounded transition-colors hover:border-primary hover:text-primary w-full sm:w-auto"
              >
                Explore how it works
              </Link>
            </div>

            {/* Trust Line */}
            <div className="mt-6 flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
                No complicated spreadsheets. No scattered travel notes.
              </span>
            </div>

          </div>

          {/* Right Column: Asymmetric Floating UI */}
          <div className="w-full md:w-7/12 relative mt-16 md:mt-0 h-[500px] hidden md:block">
            
            {/* Floating Map/Path Details */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg className="w-full h-full" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 250 C 200 150, 300 350, 450 100" stroke="#a93100" strokeDasharray="4 4" strokeWidth="1.5"></path>
                <circle cx="100" cy="250" fill="#a93100" r="4"></circle>
                <circle cx="210" cy="210" fill="#a93100" r="4"></circle>
                <circle cx="330" cy="260" fill="#a93100" r="4"></circle>
                <circle cx="450" cy="100" fill="#a93100" r="4"></circle>
              </svg>
            </div>

            {/* Itinerary Card (Floating Glassmorphism) */}
            <div className="absolute top-12 right-24 w-80 bg-surface/90 backdrop-blur-md border border-outline-variant/60 rounded-lg p-6 editorial-shadow z-30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg font-bold text-on-surface">Your next adventure</h3>
                <span className="text-[10px] font-semibold text-secondary uppercase bg-surface-container-low px-2 py-1 rounded">
                  7 DAYS
                </span>
              </div>

              <div className="relative pl-6 space-y-6">
                {/* Vertical Route Line */}
                <div className="absolute left-[7px] top-2 bottom-2 route-line-vertical z-0"></div>

                {/* Stop 1 */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-surface flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Mumbai</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Departure</p>
                  </div>
                </div>

                {/* Stop 2 */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-outline-variant flex-shrink-0 ml-[2px]"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Dubai</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Layover</p>
                  </div>
                </div>

                {/* Stop 3 */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-outline-variant flex-shrink-0 ml-[2px]"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Rome</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">3 Nights</p>
                  </div>
                </div>

                {/* Stop 4 */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Paris</p>
                    <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Final Destination</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Budget Card (Floating Bottom Left) */}
            <div className="absolute bottom-12 left-12 w-64 bg-surface border border-outline-variant/60 rounded-lg p-5 editorial-shadow z-20">
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-widest mb-1">Estimated Budget</p>
              <p className="font-serif text-3xl font-bold text-on-surface">₹48,500</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-outline-variant/40">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-secondary">Within your budget</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer Anchor */}
      <footer className="bg-surface border-t border-outline-variant/40 relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-16 py-8 max-w-7xl mx-auto">
          <div className="font-serif text-xl font-bold text-primary mb-4 md:mb-0">
            Everything you need to plan a better trip
          </div>
          <div className="flex items-center gap-8">
            <Link to="/trips" className="group flex items-center gap-2">
              <Map className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">
                Plan
              </span>
            </Link>
            <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
            <Link to="/discover/destinations" className="group flex items-center gap-2">
              <Compass className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">
                Discover
              </span>
            </Link>
            <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
            <Link to="/trips" className="group flex items-center gap-2">
              <Wallet className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">
                Budget
              </span>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
