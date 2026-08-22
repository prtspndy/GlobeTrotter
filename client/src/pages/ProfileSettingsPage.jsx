import React, { useState } from 'react';
import { User, Mail, Shield, Check, Globe, DollarSign, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_CITIES } from '../data/mockData';

export default function ProfileSettingsPage() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || 'Alexandra Vance');
  const [email, setEmail] = useState(user?.email || 'alexandra.vance@globetrotter.com');
  const [currency, setCurrency] = useState(user?.preferences?.preferredCurrency || 'USD');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      preferences: {
        ...user?.preferences,
        preferredCurrency: currency
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-outline-variant/60 pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
          Traveler Account
        </span>
        <h1 className="font-serif text-3xl font-bold text-on-surface">
          Profile & Preferences Settings
        </h1>
      </div>

      {saved && (
        <div className="p-3 bg-surface-container border border-primary text-primary rounded-sm flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider">
          <Check className="w-4 h-4" />
          <span>Profile configuration updated successfully.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-surface border border-outline/40 shadow-2xl p-8 sm:p-10 space-y-8 rounded-sm">
        
        {/* Avatar & Bio */}
        <div className="flex items-center space-x-6 border-b border-outline-variant/60 pb-6">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name}
            className="w-20 h-20 object-cover border-2 border-primary rounded-sm shadow-paper"
          />
          <div>
            <h3 className="font-serif text-xl font-bold text-on-surface">{user?.name}</h3>
            <span className="text-xs text-outline block">{user?.email}</span>
            <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] uppercase font-bold bg-primary/10 text-primary border border-primary/30 rounded-sm">
              Broadsheet Pro Traveler
            </span>
          </div>
        </div>

        {/* User Info Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4 pt-4 border-t border-outline-variant/60">
          <h4 className="font-serif text-lg font-bold text-on-surface">
            Travel Preferences & Currency
          </h4>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Preferred Currency Display
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full sm:w-64 px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>

        {/* Saved Destinations list */}
        <div className="space-y-4 pt-4 border-t border-outline-variant/60">
          <h4 className="font-serif text-lg font-bold text-on-surface flex items-center space-x-2">
            <Heart className="w-4 h-4 text-primary" />
            <span>Saved Destinations Catalog</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCK_CITIES.slice(0, 3).map(city => (
              <div key={city.id} className="p-3 border border-outline/40 bg-surface-container-low flex items-center space-x-3">
                <img src={city.image} alt={city.name} className="w-10 h-10 object-cover rounded-none" />
                <div>
                  <h5 className="font-serif text-xs font-bold text-on-surface">{city.name}</h5>
                  <span className="text-[10px] text-outline">{city.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-4 border-t border-outline-variant/60 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
          >
            Save Profile Changes
          </button>
        </div>

      </form>
    </div>
  );
}
