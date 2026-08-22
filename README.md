# 🌍 GlobeTrotter

### Empowering Personalized Travel Planning ✈️

GlobeTrotter is a personalized travel planning platform designed to make planning multi-city trips simple, interactive, and organized.

It allows travelers to create customized itineraries, manage destinations and activities, estimate trip expenses, visualize their journey, and share their travel plans with others.

---
🔗 Project Links :

🌐 Live Project: https://globetrotter1-kappa.vercel.app/
💻 GitHub Repository: https://github.com/prtspndy/GlobeTrotter
📄 Project Documentation: https://drive.google.com/file/d/1YQrrHda01JDDPAFVZqlq8hNoSbCO4XQH/view?usp=sharing
🎞️ Project Presentation: https://drive.google.com/file/d/1fIUUQwjfTTtcmx2DnytH89_6pMEUyPOk/view?usp=sharing
🎥 Demo Video: https://youtu.be/QE_F3dc9Q6M

## 🚀 Overview

Planning a multi-city trip can quickly become complicated when destinations, dates, activities, expenses, and schedules are managed separately.

**GlobeTrotter brings everything together in one place.**

The platform provides an end-to-end travel planning experience where users can:

* 🗺️ Create customized multi-city trips
* 📅 Manage travel dates and schedules
* 🏙️ Discover cities and destinations
* 🎯 Explore and add activities
* 💰 Track estimated trip expenses
* 📊 View cost breakdowns
* 🗓️ Visualize itineraries through timelines/calendars
* 👥 Share travel plans with friends and others

The project is built around a responsive and user-friendly experience backed by a relational database for managing users, trips, destinations, activities, and expenses.

---

## ✨ Features

### 🔐 Authentication

Users can securely access their personal travel plans through:

* Sign up
* Login
* Email & password authentication
* Basic form validation
* Forgot password flow

---

### 🏠 Dashboard

A central dashboard gives users a quick overview of their travel activity.

**Includes:**

* Upcoming trips
* Recent trips
* Popular destinations
* Quick actions
* Budget highlights
* Plan New Trip

---

### 🧳 Create Trip

Create a personalized trip by providing:

* Trip name
* Start date
* End date
* Description
* Optional cover image

---

### 📋 My Trips

View and manage all previously created trips.

Each trip provides:

* Trip name
* Date range
* Destination count
* View trip
* Edit trip
* Delete trip

---

### 🗺️ Itinerary Builder

Build a complete multi-city travel plan.

Users can:

* Add destinations
* Assign travel dates
* Add activities
* Organize stops
* Reorder cities
* Build a day-wise itinerary

---

### 👀 Itinerary View

Review the complete trip in an organized format.

The itinerary can display:

* Day-wise plans
* City-wise sections
* Activities
* Activity timings
* Activity costs
* Timeline/list views

---

### 🔎 City Search

Discover cities and add them to a trip.

Users can search and filter destinations using information such as:

* City
* Country
* Region
* Cost index
* Popularity

---

### 🎯 Activity Search

Discover activities for each destination.

Activities can be explored using filters such as:

* Activity type
* Cost
* Duration

Users can quickly view activity information and add or remove activities from their itinerary.

---

### 💰 Trip Budget & Cost Breakdown

Keep track of the estimated cost of a trip.

The budget section can provide breakdowns for:

* 🚗 Transportation
* 🏨 Accommodation
* 🎯 Activities
* 🍴 Meals

It can also display:

* Total estimated cost
* Average cost per day
* Cost breakdown charts
* Over-budget alerts

---

### 📅 Trip Calendar / Timeline

Visualize the entire journey chronologically.

Features include:

* Calendar-based itinerary
* Day-wise planning
* Expandable days
* Activity scheduling
* Activity reordering
* Quick editing

---

### 🔗 Shareable Itineraries

Share travel plans with friends or other users through a public itinerary page.

Users can:

* Generate a public itinerary view
* Share a trip
* View a read-only itinerary
* Copy an existing trip

---

### 👤 Profile & Settings

Users can manage their account and preferences.

Includes:

* Profile information
* Profile photo
* Email
* Language preference
* Saved destinations
* Account deletion

---

### 📊 Admin Dashboard

An optional administrative dashboard can provide insights into platform usage.

It can display:

* Total trips created
* Popular cities
* Popular activities
* User engagement
* User management
* Travel trends

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   GlobeTrotter   │
                    │       App        │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
     Authentication       Trips            Discovery
          │                  │                  │
          │                  ├── Itinerary       ├── Cities
          │                  ├── Activities      └── Activities
          │                  └── Budget
          │
          ▼
      User Profile
                             │
                             ▼
                    ┌──────────────────┐
                    │ Relational DB    │
                    └──────────────────┘
```

---

## 🗃️ Core Data Model

The application is designed around relational travel data.

A simplified relationship can be represented as:

```text
User
 │
 ├── Trips
 │     │
 │     ├── Trip Stops
 │     │      │
 │     │      ├── Cities
 │     │      └── Activities
 │     │
 │     └── Expenses
 │
 └── Profile / Preferences
```

The database stores user-specific itineraries, stops, activities, and estimated expenses.

---

## 🖥️ Main Screens

| #  | Screen              | Purpose                    |
| -- | ------------------- | -------------------------- |
| 1  | Login / Signup      | User authentication        |
| 2  | Dashboard           | Travel overview            |
| 3  | Create Trip         | Create a new trip          |
| 4  | My Trips            | Manage existing trips      |
| 5  | Itinerary Builder   | Build multi-city itinerary |
| 6  | Itinerary View      | View completed itinerary   |
| 7  | City Search         | Discover destinations      |
| 8  | Activity Search     | Discover activities        |
| 9  | Trip Budget         | Track expenses             |
| 10 | Calendar / Timeline | Visualize journey          |
| 11 | Public Itinerary    | Share trips                |
| 12 | Profile / Settings  | Manage account             |
| 13 | Admin Dashboard     | Analytics & management     |

The screen structure follows the project specification provided for GlobeTrotter.

---

## 🛠️ Tech Stack

> Update this section according to the technologies actually used in the implementation.

### Frontend

* React / Next.js
* HTML5
* CSS3
* JavaScript / TypeScript
* Responsive UI

### Backend

* Node.js
* Express.js
* REST API

### Database

* PostgreSQL / MySQL

### Authentication

* JWT / Session-based authentication

### Development Tools

* Git
* GitHub
* VS Code

---

## 📁 Project Structure

```text
GlobeTrotter/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── services/
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── README.md
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd GlobeTrotter
```

### 2. Install dependencies

```bash
npm install
```

If frontend and backend are separated:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Configure environment variables

Create a `.env` file and add the required configuration:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
API_URL=your_api_url
```

### 4. Setup the database

Run the required migrations/seed scripts according to the project's database setup.

### 5. Start the application

```bash
npm run dev
```

The application should now be available locally.

---

## 🎯 Project Goals

GlobeTrotter focuses on solving the complexity of multi-city travel planning by providing a single platform for:

**Dream → Discover → Plan → Budget → Visualize → Share**

The ultimate goal is to make travel planning as engaging and organized as the trip itself.

---

## 🌟 Future Improvements

Potential improvements include:

* 🤖 AI-powered itinerary recommendations
* 🌦️ Real-time weather information
* ✈️ Flight and hotel integrations
* 🗺️ Interactive maps
* 💱 Multi-currency support
* 🔔 Travel reminders
* 👥 Collaborative trip planning
* 📱 Progressive Web App / Mobile App
* 🌐 Multi-language support
* 🧠 Personalized destination recommendations

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 📄 Project Reference

GlobeTrotter was developed according to the provided project specification, which defines the platform's vision, mission, core functionality, screens, and optional administrative analytics dashboard.

---

## 👨‍💻 Team

**GlobeTrotter Team**

Built with ❤️ for smarter and simpler travel planning.

---

## 📜 License

This project is developed for educational / hackathon purposes.
