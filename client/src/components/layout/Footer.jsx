import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-surface-container-high border-t border-outline-variant/60 text-on-surface/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-xl shadow-paper">
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
              Editorial Horizon — Travel Engine
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-on-surface mb-4 border-b border-outline-variant/60 pb-1.5 inline-block">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-primary transition font-medium">Dashboard</Link></li>
              <li><Link to="/trips" className="hover:text-primary transition font-medium">My Trips Portfolio</Link></li>
              <li><Link to="/discover/destinations" className="hover:text-primary transition font-medium">Destinations Catalog</Link></li>
              <li><Link to="/discover/activities" className="hover:text-primary transition font-medium">Activity & Tourist Places</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition font-medium">Profile & Settings</Link></li>
            </ul>
          </div>

          {/* Technology & Features */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-on-surface mb-4 border-b border-outline-variant/60 pb-1.5 inline-block">
              Features & Architecture
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>Multi-City Trip Planner</li>
              <li>Geoapify Real-Time Route Map</li>
              <li>Day-Wise Calendar & Reminders</li>
              <li>Budget Analytics & Charts</li>
              <li>1-Click Social Trip Sharing</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-on-surface mb-4 border-b border-outline-variant/60 pb-1.5 inline-block">
              Broadsheet Newsletter
            </h4>
            <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
              Subscribe to editorial destination guides and curated multi-city travel itineraries.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Subscribed to Broadsheet!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-surface border border-outline-variant rounded-xl focus:outline-none focus:border-primary text-on-surface"
                />
                <button type="submit" className="px-4 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition flex items-center gap-1 cursor-pointer">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-outline-variant/40 flex flex-col sm:flex-row justify-between items-center text-[11px] text-on-surface-variant gap-4">
          <p>© 2026 GlobeTrotter Inc. All Rights Reserved. Styled with Editorial Horizon Design System.</p>
          <div className="flex space-x-6">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
