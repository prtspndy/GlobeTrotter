import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';

export default function AdminDashboardPage() {
  const { trips } = useTrip();
  const [filterPeriod, setFilterPeriod] = useState('Last 30 days');

  const mockUsers = [
    { id: 'usr-1', name: 'Prashant Sharma', email: 'prashant@example.com', role: 'admin', joined: '2026-01-15', tripsCount: trips.length },
    { id: 'usr-2', name: 'Elena Rostova', email: 'elena@travel.org', role: 'user', joined: '2026-02-04', tripsCount: 3 },
    { id: 'usr-3', name: 'Marcus Vance', email: 'marcus@horizon.io', role: 'user', joined: '2026-02-18', tripsCount: 2 },
    { id: 'usr-4', name: 'Sophia Chen', email: 'sophia@destinations.com', role: 'user', joined: '2026-03-01', tripsCount: 5 }
  ];

  return (
    <div className="w-full bg-surface pb-24">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-6 gap-4">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-1">
              Platform Analytics & Management
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
              Admin Control Dashboard
            </h1>
          </div>

          <div className="flex gap-4">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="bg-surface border border-outline-variant text-xs text-on-surface px-4 py-2 rounded-sm"
            >
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Year to date">Year to date</option>
            </select>

            <button className="px-4 py-2 border border-on-surface text-on-surface text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-surface-container-low transition flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">download</span>
              Export Analytics
            </button>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Total Trips Created</span>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-3xl font-bold text-on-surface">{trips.length + 14}</span>
              <span className="material-symbols-outlined text-primary text-2xl">explore</span>
            </div>
            <span className="text-[10px] text-primary font-mono">+12.5% vs last month</span>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Total Registered Users</span>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-3xl font-bold text-on-surface">1,482</span>
              <span className="material-symbols-outlined text-tertiary text-2xl">group</span>
            </div>
            <span className="text-[10px] text-primary font-mono">+8.3% new registrations</span>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Active Cities Catalog</span>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-3xl font-bold text-on-surface">{MOCK_CITIES.length}</span>
              <span className="material-symbols-outlined text-primary text-2xl">location_city</span>
            </div>
            <span className="text-[10px] text-secondary font-mono">100% database sync</span>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Itinerary Clone Rate</span>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-3xl font-bold text-on-surface">94.2%</span>
              <span className="material-symbols-outlined text-primary text-2xl">content_copy</span>
            </div>
            <span className="text-[10px] text-primary font-mono">High user engagement</span>
          </div>

        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* User Management Table (Span 7) */}
          <div className="lg:col-span-7 bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h2 className="font-serif text-xl font-bold text-on-surface">Registered User Accounts</h2>
              <span className="text-xs font-mono text-secondary">{mockUsers.length} total</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-outline-variant text-secondary font-label-caps uppercase">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3 text-right">Trips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-surface-container-low transition">
                      <td className="py-3 px-3 font-semibold text-on-surface">{u.name}</td>
                      <td className="py-3 px-3 text-secondary">{u.email}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] uppercase font-semibold border ${
                          u.role === 'admin' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-surface-container text-on-surface border-outline-variant'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-right font-bold text-on-surface">{u.tripsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Destinations Ranking (Span 5) */}
          <div className="lg:col-span-5 bg-surface border border-outline-variant p-6 rounded-sm shadow-paper space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h2 className="font-serif text-xl font-bold text-on-surface">Popularity Ranking</h2>
              <span className="text-xs font-mono text-secondary">Top Cities</span>
            </div>

            <div className="space-y-4">
              {MOCK_CITIES.map((city, idx) => (
                <div key={city.id} className="flex items-center justify-between p-3 border border-outline-variant rounded-sm bg-surface-container-low">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-primary w-5 text-center">#{idx + 1}</span>
                    <img src={city.image} alt={city.name} className="w-10 h-10 object-cover rounded-sm border border-outline-variant" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-on-surface">{city.name}</h4>
                      <span className="text-[10px] text-secondary">{city.country}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold text-on-surface">{city.popularity}% Rank</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
