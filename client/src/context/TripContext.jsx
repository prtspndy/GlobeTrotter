import React, { createContext, useContext, useState } from 'react';
import { INITIAL_TRIPS, MOCK_CITIES, MOCK_ACTIVITIES } from '../data/mockData';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [activeTripId, setActiveTripId] = useState(INITIAL_TRIPS[0]?.id || null);

  const getTrip = (id) => {
    return trips.find(t => t.id === id || t.shareId === id);
  };

  const createTrip = (tripData) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: tripData.title || "My New Travel Experience",
      description: tripData.description || "A personalized multi-city broadsheet journey.",
      coverImage: tripData.coverImage || MOCK_CITIES[0].image,
      startDate: tripData.startDate || new Date().toISOString().split('T')[0],
      endDate: tripData.endDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: "planning",
      totalBudget: Number(tripData.totalBudget) || 2000,
      visibility: tripData.visibility || "private",
      shareId: `trip-share-${Math.random().toString(36).substring(2, 9)}`,
      stops: tripData.stops || [
        {
          id: `stop-${Date.now()}`,
          cityId: "city-rome",
          cityName: "Rome",
          country: "Italy",
          startDate: tripData.startDate || new Date().toISOString().split('T')[0],
          endDate: tripData.endDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
          days: [
            {
              dayNumber: 1,
              date: tripData.startDate || new Date().toISOString().split('T')[0],
              notes: "Welcome day & leisure walk.",
              activities: [
                {
                  id: `act-${Date.now()}`,
                  title: "Historic Center Walk & Espresso",
                  startTime: "10:00",
                  durationMinutes: 120,
                  cost: 20,
                  category: "sightseeing",
                  locationName: "Piazza Navona",
                  completed: false
                }
              ]
            }
          ]
        }
      ],
      expenses: tripData.expenses || []
    };

    setTrips(prev => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  };

  const updateTrip = (id, updatedFields) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
    if (activeTripId === id) {
      setActiveTripId(trips.find(t => t.id !== id)?.id || null);
    }
  };

  const addCityStop = (tripId, cityId) => {
    const city = MOCK_CITIES.find(c => c.id === cityId) || MOCK_CITIES[0];
    const newStop = {
      id: `stop-${Date.now()}`,
      cityId: city.id,
      cityName: city.name,
      country: city.country,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      days: [
        {
          dayNumber: 1,
          date: new Date().toISOString().split('T')[0],
          notes: `Exploring ${city.name}`,
          activities: []
        }
      ]
    };

    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          stops: [...t.stops, newStop]
        };
      }
      return t;
    }));
  };

  const addActivityToDay = (tripId, stopId, dayNumber, activityData) => {
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const updatedStops = t.stops.map(stop => {
          if (stop.id === stopId) {
            const updatedDays = stop.days.map(day => {
              if (day.dayNumber === dayNumber) {
                const newActSlot = {
                  id: `act-slot-${Date.now()}`,
                  title: activityData.name || activityData.title,
                  startTime: activityData.startTime || "11:00",
                  durationMinutes: activityData.durationMinutes || 120,
                  cost: activityData.cost || 0,
                  category: activityData.category || "sightseeing",
                  locationName: activityData.locationName || stop.cityName,
                  completed: false
                };
                return {
                  ...day,
                  activities: [...day.activities, newActSlot]
                };
              }
              return day;
            });
            return { ...stop, days: updatedDays };
          }
          return stop;
        });
        return { ...t, stops: updatedStops };
      }
      return t;
    }));
  };

  const deleteActivity = (tripId, stopId, dayNumber, activitySlotId) => {
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const updatedStops = t.stops.map(stop => {
          if (stop.id === stopId) {
            const updatedDays = stop.days.map(day => {
              if (day.dayNumber === dayNumber) {
                return {
                  ...day,
                  activities: day.activities.filter(a => a.id !== activitySlotId)
                };
              }
              return day;
            });
            return { ...stop, days: updatedDays };
          }
          return stop;
        });
        return { ...t, stops: updatedStops };
      }
      return t;
    }));
  };

  const addExpense = (tripId, expenseData) => {
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const newExpense = {
          id: `exp-${Date.now()}`,
          title: expenseData.title || "General Expense",
          category: expenseData.category || "other",
          amount: Number(expenseData.amount) || 0,
          date: expenseData.date || new Date().toISOString().split('T')[0]
        };
        return {
          ...t,
          expenses: [newExpense, ...(t.expenses || [])]
        };
      }
      return t;
    }));
  };

  const deleteExpense = (tripId, expenseId) => {
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          expenses: t.expenses.filter(e => e.id !== expenseId)
        };
      }
      return t;
    }));
  };

  const copyPublicTrip = (shareId) => {
    const originalTrip = trips.find(t => t.shareId === shareId || t.id === shareId) || INITIAL_TRIPS[0];
    const clonedTrip = {
      ...originalTrip,
      id: `trip-copy-${Date.now()}`,
      title: `${originalTrip.title} (My Copy)`,
      visibility: "private",
      shareId: `copy-share-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    setTrips(prev => [clonedTrip, ...prev]);
    setActiveTripId(clonedTrip.id);
    return clonedTrip;
  };

  const generateAITrip = (params) => {
    const { destination, days, budget, vibe } = params;
    const city = MOCK_CITIES.find(c => c.name.toLowerCase().includes((destination || '').toLowerCase())) || MOCK_CITIES[0];
    
    const aiGeneratedTrip = {
      id: `ai-trip-${Date.now()}`,
      title: `AI Curated ${days || 5}-Day ${city.name} ${vibe || 'Odyssey'}`,
      description: `Bespoke AI itinerary for ${city.name} crafted according to your ${vibe || 'editorial'} style and $${budget || 2000} budget limit.`,
      coverImage: city.image,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + (days || 5) * 86400000).toISOString().split('T')[0],
      status: "planning",
      totalBudget: Number(budget) || 2000,
      visibility: "private",
      shareId: `ai-share-${Math.random().toString(36).substring(2, 9)}`,
      stops: [
        {
          id: `ai-stop-1`,
          cityId: city.id,
          cityName: city.name,
          country: city.country,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + (days || 5) * 86400000).toISOString().split('T')[0],
          days: Array.from({ length: Number(days) || 5 }).map((_, idx) => ({
            dayNumber: idx + 1,
            date: new Date(Date.now() + idx * 86400000).toISOString().split('T')[0],
            notes: `Day ${idx + 1} AI Scheduled highlights in ${city.name}`,
            activities: [
              {
                id: `ai-act-${idx}-1`,
                title: `${city.name} Iconic Highlights & Local Breakfast`,
                startTime: "09:00",
                durationMinutes: 120,
                cost: 35,
                category: "culture",
                locationName: `${city.name} Center`,
                completed: false
              },
              {
                id: `ai-act-${idx}-2`,
                title: `${vibe || 'Curated'} Special Gastronomy Experience`,
                startTime: "14:00",
                durationMinutes: 150,
                cost: 65,
                category: "food",
                locationName: `${city.name} Historic Quarter`,
                completed: false
              }
            ]
          }))
        }
      ],
      expenses: [
        { id: `ai-exp-1`, title: `Estimated Lodging in ${city.name}`, category: "accommodation", amount: (Number(budget) || 2000) * 0.4, date: new Date().toISOString().split('T')[0] },
        { id: `ai-exp-2`, title: `Transport & Transfers`, category: "transport", amount: (Number(budget) || 2000) * 0.2, date: new Date().toISOString().split('T')[0] }
      ]
    };

    setTrips(prev => [aiGeneratedTrip, ...prev]);
    setActiveTripId(aiGeneratedTrip.id);
    return aiGeneratedTrip;
  };

  return (
    <TripContext.Provider value={{
      trips,
      activeTripId,
      setActiveTripId,
      getTrip,
      createTrip,
      updateTrip,
      deleteTrip,
      addCityStop,
      addActivityToDay,
      deleteActivity,
      addExpense,
      deleteExpense,
      copyPublicTrip,
      generateAITrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
