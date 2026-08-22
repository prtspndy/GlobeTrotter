import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const { trips } = useTrip();

  const [name, setName] = useState(user?.name || 'Prashant Sharma');
  const [email, setEmail] = useState(user?.email || 'prashant@example.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalStops = trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0);
  const totalActivities = trips.reduce((acc, t) => {
    return acc + (t.stops?.reduce((sAcc, s) => sAcc + (s.activities?.length || 0), 0) || 0);
  }, 0);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full bg-surface pb-24">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-12">
        
        <header className="border-b border-outline-variant pb-6">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-on-surface">Profile & Settings</h1>
          <p className="text-xs text-secondary mt-2">Manage your traveler account, preferences, and security settings.</p>
        </header>

        {/* Profile Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-surface border border-outline-variant p-8 rounded-sm shadow-paper">
          
          {/* Avatar & Details */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary shadow-sm">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-on-surface">{name}</h2>
              <p className="text-xs text-secondary">{email}</p>
            </div>
          </div>

          {/* Travel Stats Bar */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6 border-t md:border-t-0 md:border-l border-outline-variant pt-6 md:pt-0 md:pl-8">
            <div className="text-center md:text-left space-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">flight</span>
              <span className="font-serif text-3xl font-bold text-on-surface block">{trips.length}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Trips Planned</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">location_city</span>
              <span className="font-serif text-3xl font-bold text-on-surface block">{totalStops}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Cities Visited</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">local_activity</span>
              <span className="font-serif text-3xl font-bold text-on-surface block">{totalActivities}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Activities Scheduled</span>
            </div>
          </div>

        </section>

        {/* Profile Settings Form */}
        <section className="bg-surface border border-outline-variant p-8 rounded-sm shadow-paper space-y-6 max-w-2xl">
          <h2 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant pb-3">
            Account Details
          </h2>

          {savedSuccess && (
            <div className="p-3 bg-surface-container border border-primary text-primary text-xs font-semibold rounded-sm">
              ✓ Profile settings updated successfully.
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 text-on-surface text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-sm shadow-paper hover:bg-primary-container transition"
            >
              Save Profile Changes
            </button>
          </form>
        </section>

        {/* Saved Destinations */}
        <section className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant pb-3">
            Saved Destinations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CITIES.slice(0, 3).map((city) => (
              <div key={city.id} className="relative h-64 rounded-sm overflow-hidden border border-outline-variant group shadow-paper">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-serif text-2xl font-bold">{city.name}</h4>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/80">{city.country}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
