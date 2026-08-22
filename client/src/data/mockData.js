export const MOCK_CITIES = [
  {
    id: "city-rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    description: "The Eternal City, where ancient history meets vibrant street life, espresso culture, and timeless architecture.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    costIndex: "moderate",
    popularity: 98,
    coordinates: { lat: 41.9028, lng: 12.4964 }
  },
  {
    id: "city-paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    description: "City of Light, iconic romance, world-class museums, art galleries, and historic boulevards.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    costIndex: "luxury",
    popularity: 99,
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: "city-tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    description: "Futuristic metropolis blending neon skyscrapers with historic temples, shrines, and unmatched culinary crafts.",
    image: "/tokyo_city.jpg",
    costIndex: "moderate",
    popularity: 97,
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  {
    id: "city-kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    description: "The cultural heart of Japan, famous for classical Zen temples, gardens, imperial palaces, and geisha traditions.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    costIndex: "moderate",
    popularity: 94,
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: "city-florence",
    name: "Florence",
    country: "Italy",
    region: "Europe",
    description: "Cradle of the Renaissance, renowned for masterpieces of art, Tuscan cuisine, and iconic red-tiled Duomo dome.",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80",
    costIndex: "moderate",
    popularity: 92,
    coordinates: { lat: 43.7696, lng: 11.2558 }
  },
  {
    id: "city-barcelona",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    description: "Sun-drenched Mediterranean city celebrated for Gaudí’s whimsical architecture, tapas bars, and lively beaches.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    costIndex: "moderate",
    popularity: 96,
    coordinates: { lat: 41.3851, lng: 2.1734 }
  }
];

export const MOCK_ACTIVITIES = [
  {
    id: "act-colosseum",
    cityId: "city-rome",
    cityName: "Rome",
    name: "Colosseum & Roman Forum Guided Tour",
    description: "Step into gladiatorial history with priority access to the amphitheater and ancient Forum ruins.",
    category: "sightseeing",
    cost: 45,
    durationMinutes: 180,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    locationName: "Piazza del Colosseo, 1, 00184 Roma",
    popularity: 99
  },
  {
    id: "act-vatican",
    cityId: "city-rome",
    cityName: "Rome",
    name: "Sistine Chapel & Vatican Museums",
    description: "Admire Michelangelo's ceiling frescoes and world-renowned Renaissance art collections.",
    category: "culture",
    cost: 55,
    durationMinutes: 210,
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=600&q=80",
    locationName: "Vatican City",
    popularity: 98
  },
  {
    id: "act-trastevere-food",
    cityId: "city-rome",
    cityName: "Rome",
    name: "Trastevere Evening Street Food & Wine Tasting",
    description: "Savor authentic Roman Cacio e Pepe, supplì, artisanal gelato, and Chianti wine with a local expert.",
    category: "food",
    cost: 75,
    durationMinutes: 150,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    locationName: "Trastevere District, Rome",
    popularity: 95
  },
  {
    id: "act-eiffel-sunset",
    cityId: "city-paris",
    cityName: "Paris",
    name: "Eiffel Tower Summit Access & Champagne Toast",
    description: "Panoramic sunset views across Paris from the top tier of the Iron Lady.",
    category: "sightseeing",
    cost: 65,
    durationMinutes: 120,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    locationName: "Champ de Mars, Paris",
    popularity: 99
  },
  {
    id: "act-louvre",
    cityId: "city-paris",
    cityName: "Paris",
    name: "Louvre Museum Masterpieces Tour",
    description: "Explore the Mona Lisa, Venus de Milo, and Winged Victory with expert art historian curation.",
    category: "culture",
    cost: 40,
    durationMinutes: 180,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
    locationName: "75001 Paris, France",
    popularity: 97
  },
  {
    id: "act-senkoji",
    cityId: "city-tokyo",
    cityName: "Tokyo",
    name: "Senso-ji Temple & Asakusa Walking Tour",
    description: "Experience Tokyo's oldest Buddhist temple and traditional Nakamise shopping street.",
    category: "culture",
    cost: 25,
    durationMinutes: 120,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
    locationName: "Asakusa, Taito City, Tokyo",
    popularity: 96
  }
];

export const INITIAL_TRIPS = [
  {
    id: "trip-1",
    title: "European Summer Escape: Rome & Florence",
    description: "An editorial 7-day excursion through classical Italian monuments, Tuscan vineyards, and Renaissance masterpieces.",
    coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    startDate: "2026-09-10",
    endDate: "2026-09-17",
    status: "planning",
    totalBudget: 2500,
    visibility: "public",
    shareId: "euro-summer-2026",
    stops: [
      {
        id: "stop-1",
        cityId: "city-rome",
        cityName: "Rome",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        startDate: "2026-09-10",
        endDate: "2026-09-13",
        days: [
          {
            dayNumber: 1,
            date: "2026-09-10",
            notes: "Arrival in Rome, hotel check-in, sunset walk around Trevi Fountain.",
            activities: [
              {
                id: "act-slot-1",
                activityId: "act-colosseum",
                title: "Colosseum & Roman Forum Guided Tour",
                startTime: "09:30",
                durationMinutes: 180,
                cost: 45,
                category: "sightseeing",
                locationName: "Colosseum, Rome",
                completed: true
              },
              {
                id: "act-slot-2",
                activityId: "act-trastevere-food",
                title: "Trastevere Evening Street Food & Wine Tasting",
                startTime: "18:00",
                durationMinutes: 150,
                cost: 75,
                category: "food",
                locationName: "Trastevere",
                completed: false
              }
            ]
          },
          {
            dayNumber: 2,
            date: "2026-09-11",
            notes: "Vatican Museum morning and St. Peter's Basilica dome climb.",
            activities: [
              {
                id: "act-slot-3",
                activityId: "act-vatican",
                title: "Sistine Chapel & Vatican Museums",
                startTime: "10:00",
                durationMinutes: 210,
                cost: 55,
                category: "culture",
                locationName: "Vatican City",
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "stop-2",
        cityId: "city-florence",
        cityName: "Florence",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
        startDate: "2026-09-14",
        endDate: "2026-09-17",
        days: [
          {
            dayNumber: 3,
            date: "2026-09-14",
            notes: "High-speed train to Florence, check-in, Uffizi Gallery.",
            activities: [
              {
                id: "act-slot-4",
                title: "Uffizi Gallery Renaissance Masterpieces",
                startTime: "14:00",
                durationMinutes: 150,
                cost: 32,
                category: "culture",
                locationName: "Piazzale degli Uffizi, Florence",
                completed: false
              }
            ]
          }
        ]
      }
    ],
    expenses: [
      { id: "exp-1", title: "Flight NYC to Rome", category: "transport", amount: 680, date: "2026-09-10" },
      { id: "exp-2", title: "Hotel Artemide Rome (3 Nights)", category: "accommodation", amount: 620, date: "2026-09-10" },
      { id: "exp-3", title: "Frecciarossa Train Rome to Florence", category: "transport", amount: 48, date: "2026-09-14" },
      { id: "exp-4", title: "Colosseum Tour Tickets", category: "activity", amount: 45, date: "2026-09-10" },
      { id: "exp-5", title: "Trastevere Food Tour", category: "activity", amount: 75, date: "2026-09-10" },
      { id: "exp-6", title: "Dinner at Osteria da Fortunata", category: "meal", amount: 65, date: "2026-09-11" }
    ]
  },
  {
    id: "trip-2",
    title: "Tokyo & Kyoto Cultural Odyssey",
    description: "An immersive journey across Japan's neon modernism and historic shrine gardens.",
    coverImage: "/tokyo_city.jpg",
    startDate: "2026-11-01",
    endDate: "2026-11-10",
    status: "planning",
    totalBudget: 3800,
    visibility: "private",
    shareId: "japan-odyssey-2026",
    stops: [
      {
        id: "stop-j1",
        cityId: "city-tokyo",
        cityName: "Tokyo",
        country: "Japan",
        image: "/tokyo_city.jpg",
        startDate: "2026-11-01",
        endDate: "2026-11-05",
        days: [
          {
            dayNumber: 1,
            date: "2026-11-01",
            notes: "Arrival at Haneda, Suica card setup, Shibuya Crossing.",
            activities: [
              {
                id: "act-j1",
                activityId: "act-senkoji",
                title: "Senso-ji Temple & Asakusa Walking Tour",
                startTime: "11:00",
                durationMinutes: 120,
                cost: 25,
                category: "culture",
                locationName: "Asakusa, Tokyo",
                completed: false
              }
            ]
          }
        ]
      }
    ],
    expenses: [
      { id: "exp-j1", title: "Flight to Tokyo Narita", category: "transport", amount: 1100, date: "2026-11-01" },
      { id: "exp-j2", title: "Shinjuku Hotel 4 Nights", category: "accommodation", amount: 850, date: "2026-11-01" }
    ]
  }
];

export const MOCK_USER = {
  id: "user-1",
  name: "Alexandra Vance",
  email: "alexandra.vance@globetrotter.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  role: "user",
  preferences: {
    travelStyle: ["Cultural", "Gastronomy", "Luxury Broadsheet"],
    preferredCurrency: "USD"
  },
  savedDestinations: ["city-rome", "city-paris", "city-kyoto"]
};

export const MOCK_ADMIN_STATS = {
  totalUsers: 14280,
  activeTrips: 3410,
  completedTrips: 8920,
  popularDestinations: [
    { city: "Rome", country: "Italy", tripCount: 1240 },
    { city: "Paris", country: "France", tripCount: 1180 },
    { city: "Tokyo", country: "Japan", tripCount: 950 },
    { city: "Barcelona", country: "Spain", tripCount: 820 }
  ],
  monthlyUserGrowth: [
    { month: "Jan", users: 1100 },
    { month: "Feb", users: 1450 },
    { month: "Mar", users: 2100 },
    { month: "Apr", users: 2800 },
    { month: "May", users: 3900 },
    { month: "Jun", users: 5200 }
  ]
};
