import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Calendar, DollarSign, Image, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { MOCK_CITIES } from '../data/mockData';

export default function CreateTripPage() {
  const { createTrip } = useTrip();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
  const [totalBudget, setTotalBudget] = useState(2500);
  const [coverImage, setCoverImage] = useState(MOCK_CITIES[0].image);
  const [visibility, setVisibility] = useState('private');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setError('Please provide a trip title.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('End date must be on or after start date.');
      return;
    }

    setError('');
    const newTrip = createTrip({
      title,
      description,
      startDate,
      endDate,
      totalBudget,
      coverImage,
      visibility
    });

    navigate(`/trips/${newTrip.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-outline-variant/60 pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
          Editorial Excursions
        </span>
        <h1 className="font-serif text-3xl font-bold text-on-surface">
          Plan a New Multi-City Trip
        </h1>
        <p className="text-xs text-on-surface-variant">
          Set up your journey title, date bounds, initial cover photograph, and budget limit.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-error-container text-on-error-container border border-error/30 rounded-sm flex items-center space-x-2 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface border border-outline/40 shadow-2xl p-8 sm:p-10 space-y-6 rounded-sm">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
            Trip Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Grand Tour of Classical Italy"
            className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
            Description & Notes
          </label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the travel narrative, milestones, or theme..."
            className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        {/* Dates & Budget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              End Date
            </label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Target Budget ($ USD)
            </label>
            <input
              type="number"
              min="100"
              step="100"
              required
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
            />
          </div>
        </div>

        {/* Cover Photo Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
            Select Cover Photograph
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOCK_CITIES.map(city => (
              <button
                type="button"
                key={city.id}
                onClick={() => setCoverImage(city.image)}
                className={`relative h-24 overflow-hidden border transition ${
                  coverImage === city.image ? 'border-primary ring-2 ring-primary/40' : 'border-outline/40 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover rounded-none" />
                <span className="absolute bottom-1 left-1 right-1 bg-surface/90 text-[10px] uppercase font-bold text-on-surface px-1 text-center truncate">
                  {city.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
            Trip Visibility Settings
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={() => setVisibility('private')}
                className="text-primary focus:ring-primary"
              />
              <span>Private (Only You)</span>
            </label>
            <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={() => setVisibility('public')}
                className="text-primary focus:ring-primary"
              />
              <span>Public (Generate Shareable URL)</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-outline-variant/60 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/trips')}
            className="px-5 py-2.5 text-xs font-semibold uppercase text-on-surface-variant hover:text-on-surface"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
          >
            <span>Initialize Itinerary Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
