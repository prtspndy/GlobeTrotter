import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high border-t border-outline/30 mt-0 text-on-surface/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm">
                GT
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-on-surface uppercase">
                GlobeTrotter
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Personalized multi-city travel planning platform crafted with editorial precision, day-wise itineraries, and real-time expense analytics.
            </p>
            <div className="text-[11px] uppercase tracking-widest text-outline font-semibold">
              Editorial Horizon — MERN Architecture
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-on-surface mb-4 border-b border-outline-variant/60 pb-1 inline-block">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link></li>
              <li><Link to="/trips" className="hover:text-primary transition">My Trips</Link></li>
              <li><Link to="/discover/destinations" className="hover:text-primary transition">Destinations Catalog</Link></li>
              <li><Link to="/discover/activities" className="hover:text-primary transition">Activity Discovery</Link></li>
              <li><Link to="/globe/trip/euro-summer-2026" className="hover:text-primary transition">Sample Public Trip</Link></li>
            </ul>
          </div>

          {/* Technology & Stack */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-on-surface mb-4 border-b border-outline-variant/60 pb-1 inline-block">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>MongoDB & Mongoose Schema</li>
              <li>Express.js RESTful API</li>
              <li>React + Vite Client</li>
              <li>Node.js Security & JWT Auth</li>
              <li>Google Gemini AI Integration</li>
            </ul>
          </div>

          {/* Newsletter / Broadsheet */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-on-surface mb-4 border-b border-outline-variant/60 pb-1 inline-block">
              The Broadsheet Dispatch
            </h4>
            <p className="text-xs text-on-surface-variant mb-3">
              Subscribe to editorial destination guides and curated multi-city travel itineraries.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 text-xs bg-surface border border-outline/50 rounded-l-sm focus:outline-none focus:border-primary text-on-surface"
              />
              <button className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-r-sm hover:bg-primary-container transition">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-outline-variant/40 flex flex-col sm:flex-row justify-between items-center text-[11px] text-on-surface-variant">
          <p>© 2026 GlobeTrotter Inc. All Rights Reserved. Styled with Editorial Horizon Design System.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
