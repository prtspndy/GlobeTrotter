import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

export default function BudgetDashboardPage() {
  const { id } = useParams();
  const { getTrip, addExpenseToTrip, deleteExpenseFromTrip } = useTrip();

  const trip = getTrip(id);

  // New Expense State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Accommodation');
  const [showAddModal, setShowAddModal] = useState(false);

  if (!trip) {
    return (
      <div className="max-w-container-max mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-on-surface">Trip Not Found</h2>
        <Link to="/trips" className="inline-block px-6 py-2.5 bg-primary text-white text-xs uppercase font-semibold">
          Return to My Trips
        </Link>
      </div>
    );
  }

  const expenses = trip.expenses || [];
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalBudget = trip.totalBudget || 3500;
  const remainingBudget = totalBudget - totalExpenses;
  const percentUsed = Math.min(100, Math.round((totalExpenses / totalBudget) * 100));

  const categories = ['Accommodation', 'Transportation', 'Activities', 'Food & Dining', 'Other'];

  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = expenses.filter((e) => e.category === cat).reduce((cAcc, e) => cAcc + Number(e.amount), 0);
    return acc;
  }, {});

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    addExpenseToTrip(trip.id, {
      description,
      amount: Number(amount),
      category
    });

    setDescription('');
    setAmount('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full bg-surface pb-24">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-6 gap-4">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-1">
              {trip.title} &bull; {trip.startDate} — {trip.endDate}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">
              Trip Budget & Cost Breakdown
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition flex items-center gap-1.5 shadow-paper"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Log Expense
            </button>

            <Link
              to={`/trips/${trip.id}`}
              className="px-5 py-3 border border-on-surface text-on-surface hover:bg-surface-container-low text-xs font-semibold uppercase tracking-wider rounded-sm transition flex items-center gap-1.5"
            >
              View Itinerary &rarr;
            </Link>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Overall Budget Card (Span 5) */}
          <div className="md:col-span-5 bg-surface border border-outline-variant p-8 rounded-sm shadow-paper flex flex-col justify-between space-y-6">
            <h2 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant pb-3">
              Overall Budget Status
            </h2>

            <div className="text-center space-y-3 py-4">
              <span className="text-xs font-label-caps text-secondary uppercase tracking-widest">
                Total Expenses Logged
              </span>
              <div className="font-serif text-5xl font-bold text-on-surface">
                ${totalExpenses.toLocaleString()}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container border border-outline-variant rounded-sm text-xs font-mono font-semibold">
                <span className={remainingBudget >= 0 ? "text-primary" : "text-error"}>
                  {remainingBudget >= 0 ? '✓ Within Allocated Cap' : '⚠ Over Budget Warning'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-secondary">
                <span>Budget Cap Allocation</span>
                <span>{percentUsed}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${percentUsed > 90 ? 'bg-error' : 'bg-primary'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-4 text-xs">
              <div>
                <span className="text-secondary uppercase block font-semibold text-[10px]">Total Budget Cap</span>
                <span className="font-serif text-lg font-bold text-on-surface">${totalBudget.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-secondary uppercase block font-semibold text-[10px]">Remaining Balance</span>
                <span className={`font-serif text-lg font-bold ${remainingBudget >= 0 ? 'text-on-surface' : 'text-error'}`}>
                  ${remainingBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Category Breakdown (Span 7) */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-surface border border-outline-variant p-8 rounded-sm shadow-paper space-y-6">
              <h2 className="font-serif text-2xl font-bold text-on-surface border-b border-outline-variant pb-3">
                Expense Category Breakdown
              </h2>

              <div className="space-y-4">
                {categories.map((cat) => {
                  const catSpent = categoryTotals[cat] || 0;
                  const catPercent = totalExpenses > 0 ? Math.round((catSpent / totalExpenses) * 100) : 0;

                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-on-surface">{cat}</span>
                        <span className="font-mono text-secondary">${catSpent.toLocaleString()} ({catPercent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${catPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Itemized Expenses Table */}
        <section className="bg-surface border border-outline-variant p-8 rounded-sm shadow-paper space-y-6">
          <div className="flex justify-between items-center border-b border-outline-variant pb-4">
            <h2 className="font-serif text-2xl font-bold text-on-surface">Itemized Expenses Log</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              + Log New Expense
            </button>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-10 text-xs text-secondary">
              No expenses logged yet. Click "Log Expense" to track accommodation, transit, or meal costs.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-outline-variant text-secondary font-label-caps uppercase">
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Amount ($)</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {expenses.map((exp, idx) => (
                    <tr key={exp.id || idx} className="hover:bg-surface-container-low transition">
                      <td className="py-3.5 px-4 font-semibold text-on-surface">{exp.description}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-surface-container border border-outline-variant rounded-sm text-[10px] uppercase font-semibold">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right text-on-surface">${Number(exp.amount).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => deleteExpenseFromTrip(trip.id, exp.id)}
                          className="text-secondary hover:text-error transition"
                          title="Delete expense"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant p-6 rounded-sm shadow-paper max-w-md w-full space-y-5">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h3 className="font-serif text-xl font-bold text-on-surface">Log New Expense</h3>
              <button onClick={() => setShowAddModal(false)} className="text-secondary hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Expense Description *</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Hotel High-Speed Train Tickets"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1 focus:ring-0 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Amount ($) *</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="150"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1 focus:ring-0 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-outline text-sm pb-1 focus:ring-0 focus:border-primary"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-surface">{c}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-sm">
                Save Expense Log
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
