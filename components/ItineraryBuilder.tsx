'use client';

import React, { useState } from 'react';
import { Trip, Stop, Activity, ActivityCategory } from '@/types/trip';
import { Plus, Trash2, GripVertical, Clock, DollarSign, MapPin, Calendar, CheckCircle } from 'lucide-react';

interface ItineraryBuilderProps {
  trip: Trip;
  onUpdateTrip?: (updatedTrip: Trip) => void;
}

export default function ItineraryBuilder({ trip, onUpdateTrip }: ItineraryBuilderProps) {
  const [currentTrip, setCurrentTrip] = useState<Trip>(trip);
  const [isAddStopOpen, setIsAddStopOpen] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCountry, setNewCountry] = useState('India');
  
  // Activity modal state
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [newActTitle, setNewActTitle] = useState('');
  const [newActCost, setNewActCost] = useState<number>(0);
  const [newActCategory, setNewActCategory] = useState<ActivityCategory>('SIGHTSEEING');
  const [newActTime, setNewActTime] = useState('10:00 AM');

  // Add Stop Handler
  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    const newStop: Stop = {
      id: `stop-${Date.now()}`,
      tripId: currentTrip.id,
      cityName: newCityName.trim(),
      country: newCountry.trim(),
      startDate: currentTrip.startDate,
      endDate: currentTrip.endDate,
      order: currentTrip.stops.length + 1,
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      activities: []
    };

    const updated = {
      ...currentTrip,
      stops: [...currentTrip.stops, newStop]
    };

    setCurrentTrip(updated);
    if (onUpdateTrip) onUpdateTrip(updated);
    setNewCityName('');
    setIsAddStopOpen(false);
  };

  // Remove Stop Handler
  const handleRemoveStop = (stopId: string) => {
    const updatedStops = currentTrip.stops.filter((s) => s.id !== stopId);
    const updated = { ...currentTrip, stops: updatedStops };
    setCurrentTrip(updated);
    if (onUpdateTrip) onUpdateTrip(updated);
  };

  // Add Activity Handler
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStopId || !newActTitle.trim()) return;

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      stopId: activeStopId,
      title: newActTitle.trim(),
      category: newActCategory,
      cost: Number(newActCost) || 0,
      startTime: newActTime,
      durationMinutes: 120,
      completed: false,
      order: 1
    };

    const updatedStops = currentTrip.stops.map((s) => {
      if (s.id === activeStopId) {
        return { ...s, activities: [...s.activities, newActivity] };
      }
      return s;
    });

    const updated = { ...currentTrip, stops: updatedStops };
    setCurrentTrip(updated);
    if (onUpdateTrip) onUpdateTrip(updated);

    setNewActTitle('');
    setNewActCost(0);
    setActiveStopId(null);
  };

  // Remove Activity Handler
  const handleRemoveActivity = (stopId: string, actId: string) => {
    const updatedStops = currentTrip.stops.map((s) => {
      if (s.id === stopId) {
        return { ...s, activities: s.activities.filter((a) => a.id !== actId) };
      }
      return s;
    });

    const updated = { ...currentTrip, stops: updatedStops };
    setCurrentTrip(updated);
    if (onUpdateTrip) onUpdateTrip(updated);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-4 sm:p-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Interactive Itinerary Builder
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-on-surface">
            {currentTrip.title}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {currentTrip.stops.length} Cities Added &bull; {currentTrip.startDate} to {currentTrip.endDate}
          </p>
        </div>

        <button
          onClick={() => setIsAddStopOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-primary-container transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Destination Stop</span>
        </button>
      </div>

      {/* Stop Nodes List */}
      <div className="space-y-6">
        {currentTrip.stops.map((stop, index) => (
          <div key={stop.id} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-paper transition hover:border-primary/50">
            
            {/* Stop Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-surface-container-low border-b border-outline-variant gap-4">
              <div className="flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-secondary cursor-grab hidden sm:block" />
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant">
                  <img src={stop.image || 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=200&q=80'} alt={stop.cityName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Stop {index + 1} &bull; {stop.country}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-on-surface">{stop.cityName}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveStopId(stop.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-outline-variant text-xs font-semibold text-on-surface rounded-lg hover:border-primary transition"
                >
                  <Plus className="w-3.5 h-3.5 text-primary" />
                  <span>Add Activity</span>
                </button>

                <button
                  onClick={() => handleRemoveStop(stop.id)}
                  className="p-2 text-secondary hover:text-error transition"
                  title="Remove Stop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Activities List */}
            <div className="p-6 space-y-3">
              {stop.activities && stop.activities.length > 0 ? (
                stop.activities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-3.5 bg-surface border border-outline-variant/60 rounded-xl hover:bg-surface-container-low transition">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold font-mono text-primary">{act.startTime || '10:00 AM'}</span>
                          <h4 className="text-sm font-semibold text-on-surface">{act.title}</h4>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-secondary">{act.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold font-mono text-on-surface">₹{act.cost}</span>
                      <button
                        onClick={() => handleRemoveActivity(stop.id, act.id)}
                        className="text-secondary hover:text-error text-xs"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border border-dashed border-outline-variant rounded-xl text-xs text-secondary">
                  No activity scheduled for {stop.cityName} yet. Click "Add Activity" to plan.
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add Stop Modal */}
      {isAddStopOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold font-serif text-on-surface">Add Destination Stop</h3>
            <form onSubmit={handleAddStop} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase mb-1">City Name</label>
                <input
                  type="text"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  placeholder="e.g. Udaipur, Goa, Kyoto"
                  required
                  className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddStopOpen(false)} className="px-4 py-2 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-xl">Add Stop</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {activeStopId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold font-serif text-on-surface">Add Scheduled Activity</h3>
            <form onSubmit={handleAddActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase mb-1">Activity Title</label>
                <input
                  type="text"
                  value={newActTitle}
                  onChange={(e) => setNewActTitle(e.target.value)}
                  placeholder="e.g. Amber Fort Guided Sightseeing"
                  required
                  className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase mb-1">Cost (₹)</label>
                  <input
                    type="number"
                    value={newActCost}
                    onChange={(e) => setNewActCost(Number(e.target.value))}
                    className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase mb-1">Time</label>
                  <input
                    type="text"
                    value={newActTime}
                    onChange={(e) => setNewActTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-xl px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveStopId(null)} className="px-4 py-2 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-xl">Save Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
