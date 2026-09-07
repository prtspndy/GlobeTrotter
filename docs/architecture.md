# GlobeTrotter System Architecture

GlobeTrotter is a MERN application with a Vite-powered React client and an
Express REST API backed by MongoDB.

## Architecture

- **Frontend:** React, React Router, Vite, and Tailwind CSS.
- **Backend:** Node.js and Express REST API.
- **Database:** MongoDB with Mongoose.
- **Authentication:** JWT bearer tokens and optional Google OAuth 2.0.
- **Integrations:** Cloudinary for image uploads and Gemini for AI features.

The browser reads `VITE_API_BASE_URL` and sends requests to the API under
`/api/v1`. The server validates authentication tokens, applies rate limiting,
and exposes domain-specific routes for users, trips, itineraries, budgets,
expenses, discovery, sharing, and administration.
