import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Compass, DollarSign, Calendar, Sliders } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export default function AITripModal({ isOpen, onClose }) {
  const { generateAITrip } = useTrip();
  const navigate = useNavigate();

  const [destination, setDestination] = useState('Rome');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(2500);
  const [vibe, setVibe] = useState('Cultural & Gastronomy');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generatedTrip = generateAITrip({
        destination,
        days,
        budget,
        vibe
      });
      setIsGenerating(false);
      onClose();
      navigate(`/trips/${generatedTrip.id}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-outline/40 shadow-2xl rounded-sm w-full max-w-lg overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-surface-container-high px-6 py-4 border-b border-outline-variant/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-on-surface uppercase tracking-tight">
                AI Smart Trip Architect
              </h3>
              <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">
                Google Gemini Powered Itinerary Engine
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-on-surface/60 hover:text-on-surface focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Destination input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Primary Destination / City
            </label>
            <div className="relative">
              <Compass className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Rome, Tokyo, Paris, Barcelona"
                className="w-full pl-9 pr-3 py-2 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>

          {/* Duration & Budget 2-column grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Duration (Days)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-outline absolute left-3 top-3" />
                <input
                  type="number"
                  min="1"
                  max="30"
                  required
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Total Budget ($ USD)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-outline absolute left-3 top-3" />
                <input
                  type="number"
                  min="100"
                  step="100"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Travel Vibe Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Travel Vibe & Style
            </label>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
            >
              <option value="Cultural & Historic">Cultural & Historic Landmarks</option>
              <option value="Gastronomy & Culinary">Gastronomy & Michelin Street Food</option>
              <option value="Luxury Broadsheet Excursion">Luxury Broadsheet Excursion</option>
              <option value="Outdoor & Hiking Adventure">Outdoor & Nature Adventure</option>
              <option value="Relaxed Coastal & Beaches">Relaxed Coastal & Beaches</option>
            </select>
          </div>

          {/* Footer CTA button */}
          <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase text-on-surface/70 hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="flex items-center space-x-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-primary text-white rounded-sm hover:bg-primary-container disabled:opacity-50 transition shadow-paper"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Trip</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
