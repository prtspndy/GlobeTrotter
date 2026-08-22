import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import DashboardPage from './pages/DashboardPage';
import MyTripsPage from './pages/MyTripsPage';
import CreateTripPage from './pages/CreateTripPage';
import ItineraryBuilderPage from './pages/ItineraryBuilderPage';
import BudgetDashboardPage from './pages/BudgetDashboardPage';
import CalendarTimelinePage from './pages/CalendarTimelinePage';
import CityDiscoveryPage from './pages/CityDiscoveryPage';
import ActivityDiscoveryPage from './pages/ActivityDiscoveryPage';
import PublicTripPage from './pages/PublicTripPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-background text-on-surface font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/trips" element={<MyTripsPage />} />
                <Route path="/trips/create" element={<CreateTripPage />} />
                <Route path="/trips/:id" element={<ItineraryBuilderPage />} />
                <Route path="/trips/:id/budget" element={<BudgetDashboardPage />} />
                <Route path="/trips/:id/calendar" element={<CalendarTimelinePage />} />
                <Route path="/discover/destinations" element={<CityDiscoveryPage />} />
                <Route path="/discover/activities" element={<ActivityDiscoveryPage />} />
                <Route path="/globe/trip/:shareId" element={<PublicTripPage />} />
                <Route path="/profile" element={<ProfileSettingsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TripProvider>
    </AuthProvider>
  );
}
