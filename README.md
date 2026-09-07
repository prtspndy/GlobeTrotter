# GlobeTrotter

GlobeTrotter is a personalized travel-planning platform for creating
multi-city itineraries, discovering destinations and activities, tracking
budgets, and sharing trips.

## Features

- JWT authentication with optional Google OAuth
- Multi-city trip and day-by-day itinerary planning
- City and activity discovery
- Budget and expense tracking
- Calendar and timeline views
- Public, shareable itineraries
- Optional AI recommendations and Cloudinary image uploads
- Admin dashboard

## Technology

- **Client:** React, Vite, React Router, Tailwind CSS
- **Server:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Authentication:** JWT bearer tokens and Google OAuth 2.0

## Project layout

```text
client/       React application
server/       Express API and MongoDB models
docs/         Architecture, API, database, and user-flow documentation
```

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- MongoDB (local or hosted)

## Setup

Install all workspace dependencies:

```bash
npm run install:all
```

Create environment files from the provided examples:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Set a unique `JWT_SECRET` and configure `MONGO_URI` in `server/.env`.
Set `VITE_API_BASE_URL` in `client/.env` if the API is not running at its
default URL.

Start the API and client in separate terminals:

```bash
npm run server:dev
npm run client:dev
```

The client runs at `http://localhost:5173` and the API at
`http://localhost:5000`. The API health endpoint is
`http://localhost:5000/health`.

## Useful commands

```bash
npm run client:build
npm run client:lint
npm run server:test
npm run seed
```

## Documentation

- [API](docs/api.md)
- [Architecture](docs/architecture.md)
- [Database](docs/database.md)
- [User flow](docs/user-flow.md)

## Links

- [Live application](https://globetrotter1-kappa.vercel.app/)
- [GitHub repository](https://github.com/prtspndy/GlobeTrotter)
- [Demo video](https://youtu.be/QE_F3dc9Q6M)

## License

This project is developed for educational and hackathon purposes.
