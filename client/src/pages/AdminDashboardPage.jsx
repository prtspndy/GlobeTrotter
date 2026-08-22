import React from 'react';
import { ShieldCheck, Users, Compass, MapPin, TrendingUp, Activity } from 'lucide-react';
import { MOCK_ADMIN_STATS } from '../data/mockData';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-surface-container-high border border-outline/40 p-8 shadow-paper flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-tertiary mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Administration & Analytics</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-on-surface">
            GlobeTrotter System Metrics
          </h1>
        </div>

        <span className="px-3 py-1 bg-tertiary/10 text-tertiary font-bold text-xs uppercase border border-tertiary/30 rounded-sm">
          Live Operational Status
        </span>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Total Registered Users</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">
              {MOCK_ADMIN_STATS.totalUsers.toLocaleString()}
            </span>
            <Users className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Active User Trips</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">
              {MOCK_ADMIN_STATS.activeTrips.toLocaleString()}
            </span>
            <Compass className="w-5 h-5 text-tertiary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Completed Excursions</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">
              {MOCK_ADMIN_STATS.completedTrips.toLocaleString()}
            </span>
            <Activity className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">User Growth Rate</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">+34.8%</span>
            <TrendingUp className="w-5 h-5 text-tertiary" />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Growth Chart, Right Top Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Growth Bar Visualizer */}
        <div className="lg:col-span-8 bg-surface border border-outline/40 p-8 shadow-paper space-y-6">
          <h3 className="font-serif text-xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
            Monthly Platform User Growth (2026)
          </h3>

          <div className="h-64 flex items-end justify-between gap-4 pt-8">
            {MOCK_ADMIN_STATS.monthlyUserGrowth.map(item => {
              const maxUsers = 6000;
              const heightPercent = Math.round((item.users / maxUsers) * 100);

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-serif font-bold text-primary">{item.users}</span>
                  <div 
                    className="w-full bg-primary hover:bg-primary-container transition duration-300 rounded-t-sm"
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                  <span className="text-xs font-semibold text-outline uppercase">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Destinations Ranking */}
        <div className="lg:col-span-4 bg-surface border border-outline/40 p-8 shadow-paper space-y-6">
          <h3 className="font-serif text-xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
            Top Booked Destinations
          </h3>

          <div className="space-y-4">
            {MOCK_ADMIN_STATS.popularDestinations.map((dest, idx) => (
              <div key={dest.city} className="flex justify-between items-center p-3 bg-surface-container-low border border-outline/30 rounded-sm">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary text-white font-serif font-bold text-xs flex items-center justify-center rounded-sm">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-on-surface">{dest.city}</h4>
                    <span className="text-[11px] text-outline">{dest.country}</span>
                  </div>
                </div>
                <span className="font-serif font-bold text-xs text-primary">{dest.tripCount} Trips</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
