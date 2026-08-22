import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import LandingPage from '../pages/public/LandingPage';
import PublicTripPage from '../pages/public/PublicTripPage';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

import DashboardPage from '../pages/dashboard/DashboardPage';

import MyTripsPage from '../pages/trips/MyTripsPage';
import CreateTripPage from '../pages/trips/CreateTripPage';
import EditTripPage from '../pages/trips/EditTripPage';
import TripDetailsPage from '../pages/trips/TripDetailsPage';

import ItineraryBuilderPage from '../pages/itinerary/ItineraryBuilderPage';
import ItineraryViewPage from '../pages/itinerary/ItineraryViewPage';

import CitySearchPage from '../pages/explore/CitySearchPage';
import ActivitySearchPage from '../pages/explore/ActivitySearchPage';

import BudgetPage from '../pages/budget/BudgetPage';
import CalendarPage from '../pages/calendar/CalendarPage';
import ProfileSettingsPage from '../pages/profile/ProfileSettingsPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/globe/trip/:shareId" element={<PublicTripPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/trips" element={<MyTripsPage />} />
        <Route path="/trips/create" element={<CreateTripPage />} />
        <Route path="/trips/:id/edit" element={<EditTripPage />} />
        <Route path="/trips/:id/details" element={<TripDetailsPage />} />
        <Route path="/trips/:id" element={<ItineraryBuilderPage />} />
        <Route path="/trips/:id/view" element={<ItineraryViewPage />} />
        <Route path="/discover/destinations" element={<CitySearchPage />} />
        <Route path="/discover/activities" element={<ActivitySearchPage />} />
        <Route path="/trips/:id/budget" element={<BudgetPage />} />
        <Route path="/trips/:id/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfileSettingsPage />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
}
