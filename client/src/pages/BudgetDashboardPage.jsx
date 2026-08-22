import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DollarSign, PlusCircle, Trash2, AlertCircle, PieChart, Layers, Calendar, ArrowLeft } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function BudgetDashboardPage() {
  const { id } = useParams();
  const { getTrip, addExpense, deleteExpense } = useTrip();

  const trip = getTrip(id);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('transport');
  const [amount, setAmount] = useState('');

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-on-surface">Trip Not Found</h2>
        <Link to="/trips" className="inline-block px-4 py-2 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  const totalSpent = trip.expenses?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;
  const remainingBudget = (trip.totalBudget || 0) - totalSpent;
  const isOverBudget = remainingBudget < 0;

  // Category breakdown metrics
  const categoryTotals = (trip.expenses || []).reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense(trip.id, {
      title,
      category,
      amount: Number(amount)
    });

    setTitle('');
    setAmount('');
    setIsAddExpenseOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <Link to={`/trips/${trip.id}`} className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline flex items-center space-x-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Itinerary Builder</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-on-surface">
            Budget Dashboard: {trip.title}
          </h1>
        </div>

        <button
          onClick={() => setIsAddExpenseOpen(true)}
          className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log Expense Item</span>
        </button>
      </div>

      {/* Over-Budget Alert Banner */}
      {isOverBudget && (
        <div className="p-4 bg-error-container text-on-error-container border border-error/40 rounded-sm flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-error" />
          <span>Warning: Expenditure exceeds set budget limit by ${Math.abs(remainingBudget).toLocaleString()}</span>
        </div>
      )}

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Total Set Budget</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">${trip.totalBudget.toLocaleString()}</span>
            <DollarSign className="w-5 h-5 text-tertiary" />
          </div>
        </div>

        <div className="bg-surface border border-outline/40 p-6 shadow-paper space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Total Logged Expenses</span>
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-3xl font-bold text-on-surface">${totalSpent.toLocaleString()}</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className={`bg-surface border p-6 shadow-paper space-y-2 ${isOverBudget ? 'border-error/60' : 'border-outline/40'}`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">Remaining Balance</span>
          <div className="flex justify-between items-baseline">
            <span className={`font-serif text-3xl font-bold ${isOverBudget ? 'text-error' : 'text-on-surface'}`}>
              ${remainingBudget.toLocaleString()}
            </span>
            <DollarSign className={`w-5 h-5 ${isOverBudget ? 'text-error' : 'text-on-surface'}`} />
          </div>
        </div>

      </div>

      {/* Category Cost Breakdown Bars */}
      <div className="bg-surface border border-outline/40 p-8 shadow-paper space-y-6">
        <h3 className="font-serif text-xl font-bold text-on-surface border-b border-outline-variant/60 pb-3">
          Expense Breakdown by Category
        </h3>

        <div className="space-y-4">
          {[
            { key: 'transport', label: 'Transportation & Flights', color: 'bg-primary' },
            { key: 'accommodation', label: 'Accommodation & Hotels', color: 'bg-tertiary' },
            { key: 'activity', label: 'Activities & Tours', color: 'bg-primary-container' },
            { key: 'meal', label: 'Meals & Dining', color: 'bg-on-surface' },
            { key: 'other', label: 'Other Expenses', color: 'bg-secondary' }
          ].map(cat => {
            const catAmount = categoryTotals[cat.key] || 0;
            const percent = totalSpent > 0 ? Math.round((catAmount / totalSpent) * 100) : 0;

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
                  <span className="text-on-surface-variant">{cat.label}</span>
                  <span className="text-on-surface">${catAmount.toLocaleString()} ({percent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} transition-all duration-500`} style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expenses History Table */}
      <div className="bg-surface border border-outline/40 shadow-paper overflow-hidden">
        <div className="p-6 border-b border-outline-variant/60 flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-on-surface">
            Logged Expense Transactions ({trip.expenses?.length || 0})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-high uppercase tracking-wider font-semibold text-on-surface-variant border-b border-outline-variant/60">
              <tr>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {trip.expenses?.map(exp => (
                <tr key={exp.id} className="hover:bg-surface-container-low transition">
                  <td className="px-6 py-4 font-semibold text-on-surface">{exp.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-[10px] uppercase font-bold bg-surface-container text-on-surface-variant border border-outline-variant/60 rounded-sm">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-outline">{exp.date}</td>
                  <td className="px-6 py-4 font-serif font-bold text-sm text-primary text-right">${exp.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteExpense(trip.id, exp.id)}
                      className="text-on-surface/40 hover:text-error transition"
                      title="Remove Expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface border border-outline/40 p-6 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-on-surface">Log Expense Transaction</h3>
            
            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold text-on-surface-variant mb-1">Title / Description *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flight ticket or Hotel booking"
                  className="w-full p-2.5 bg-surface-container-low border border-outline/50 rounded-sm text-sm"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-on-surface-variant mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-surface-container-low border border-outline/50 rounded-sm text-sm"
                >
                  <option value="transport">Transport & Flights</option>
                  <option value="accommodation">Accommodation & Hotels</option>
                  <option value="activity">Activities & Tours</option>
                  <option value="meal">Meals & Dining</option>
                  <option value="other">Other Expenses</option>
                </select>
              </div>

              <div>
                <label className="block uppercase font-semibold text-on-surface-variant mb-1">Amount ($ USD) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="150"
                  className="w-full p-2.5 bg-surface-container-low border border-outline/50 rounded-sm text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-4 py-2 text-xs uppercase font-semibold text-on-surface-variant"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white text-xs uppercase font-semibold rounded-sm"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
