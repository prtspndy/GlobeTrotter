'use client';

import React from 'react';
import { BudgetBreakdown as BudgetBreakdownType, Trip } from '@/types/trip';
import { DollarSign, AlertTriangle, TrendingUp, Calendar, PieChart as PieIcon, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface BudgetBreakdownProps {
  trip: Trip;
  breakdown: BudgetBreakdownType;
}

const CATEGORY_COLORS: Record<string, string> = {
  TRANSPORTATION: '#0076d3',
  ACCOMMODATION: '#a93100',
  ACTIVITIES: '#059669',
  MEALS: '#d97706',
  OTHER: '#6b7280'
};

export default function BudgetBreakdownComponent({ trip, breakdown }: BudgetBreakdownProps) {
  const chartData = breakdown.byCategory
    .filter((c) => c.amount > 0)
    .map((c) => ({
      name: c.category.charAt(0) + c.category.slice(1).toLowerCase(),
      value: c.amount,
      color: CATEGORY_COLORS[c.category] || '#6b7280'
    }));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-4 sm:p-6">
      
      {/* Overbudget Alert Banner */}
      {breakdown.isOverBudget && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium shadow-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span>
            <strong>Over Budget Warning!</strong> You have exceeded your initial target budget by{' '}
            <strong className="font-mono">₹{Math.abs(breakdown.remainingBudget).toLocaleString()}</strong>.
          </span>
        </div>
      )}

      {/* Financial Summary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-outline-variant rounded-2xl shadow-paper space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Total Budget Target</span>
          <span className="text-2xl font-bold font-serif text-on-surface">₹{breakdown.totalBudget.toLocaleString()}</span>
        </div>

        <div className="p-5 bg-surface border border-outline-variant rounded-2xl shadow-paper space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Total Spent & Scheduled</span>
          <span className="text-2xl font-bold font-serif text-primary">₹{breakdown.totalSpent.toLocaleString()}</span>
        </div>

        <div className="p-5 bg-surface border border-outline-variant rounded-2xl shadow-paper space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Remaining Capacity</span>
          <span className={`text-2xl font-bold font-serif ${breakdown.remainingBudget >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ₹{breakdown.remainingBudget.toLocaleString()}
          </span>
        </div>

        <div className="p-5 bg-surface border border-outline-variant rounded-2xl shadow-paper space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Daily Average Spend</span>
          <span className="text-2xl font-bold font-serif text-on-surface">₹{breakdown.dailyAverage.toLocaleString()}</span>
        </div>
      </div>

      {/* Financial Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Donut Breakdown Chart */}
        <div className="lg:col-span-7 bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-3">
            <PieIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold font-serif text-on-surface">Cost Breakdown by Category</h3>
          </div>

          {chartData.length > 0 ? (
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-secondary border border-dashed border-outline-variant rounded-xl">
              No expenses or scheduled activities logged yet.
            </div>
          )}

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {chartData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="font-medium text-on-surface">{c.name}:</span>
                <span className="font-mono text-secondary">₹{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses List */}
        <div className="lg:col-span-5 bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold font-serif text-on-surface">Logged Expenses</h3>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {trip.expenses && trip.expenses.length > 0 ? (
              trip.expenses.map((e) => (
                <div key={e.id} className="flex justify-between items-center p-3 bg-surface-container-low border border-outline-variant/60 rounded-xl">
                  <div>
                    <h4 className="text-xs font-semibold text-on-surface">{e.title}</h4>
                    <span className="text-[10px] text-secondary uppercase font-mono">{e.category} &bull; {e.date}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">₹{e.amount}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-xs text-secondary">
                No custom expenses added yet.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
