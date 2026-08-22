const generateItineraryWithAI = async ({ destination, days, budget, vibe }) => {
  return {
    title: `AI Curated ${days}-Day ${destination} ${vibe || 'Odyssey'}`,
    description: `Bespoke AI itinerary generated for ${destination} across ${days} days with $${budget} budget limit.`,
    stops: [
      {
        cityName: destination,
        country: 'Featured Country',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + (days || 5) * 86400000).toISOString().split('T')[0],
        days: Array.from({ length: Number(days) || 5 }).map((_, idx) => ({
          dayNumber: idx + 1,
          date: new Date(Date.now() + idx * 86400000).toISOString().split('T')[0],
          notes: `Day ${idx + 1} AI Scheduled highlights in ${destination}`,
          activities: [
            {
              title: `${destination} Historic Center Walk & Local Breakfast`,
              startTime: '09:00',
              durationMinutes: 120,
              cost: 35,
              category: 'culture',
              locationName: `${destination} Central Quarter`
            },
            {
              title: `${vibe || 'Curated'} Gastronomy Experience`,
              startTime: '14:00',
              durationMinutes: 150,
              cost: 65,
              category: 'food',
              locationName: `${destination} Historic Quarter`
            }
          ]
        }))
      }
    ]
  };
};

module.exports = { generateItineraryWithAI };
