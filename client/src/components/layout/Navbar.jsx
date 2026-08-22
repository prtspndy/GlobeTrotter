import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, PlusCircle, ShieldCheck, Menu, X, Sun, Moon, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useUserLocation } from '../../hooks/useUserLocation';
import AITripModal from '../modals/AITripModal';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { location: userLoc } = useUserLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-outline-variant/40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Monogram */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-serif text-xl font-bold tracking-tight rounded-xl shadow-paper group-hover:bg-primary-container transition">
              GT
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-on-surface uppercase block">
                GlobeTrotter
              </span>
              <span className="text-[10px] tracking-widest text-outline uppercase font-semibold block -mt-1">
                Editorial Horizon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link 
                to="/dashboard" 
                className={`transition hover:text-primary ${isActive('/dashboard') ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-on-surface/80'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/trips" 
                className={`transition hover:text-primary ${isActive('/trips') ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-on-surface/80'}`}
              >
                My Trips
              </Link>
              <Link 
                to="/discover/destinations" 
                className={`transition hover:text-primary ${isActive('/discover/destinations') ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-on-surface/80'}`}
              >
                Destinations
              </Link>
              <Link 
                to="/discover/activities" 
                className={`transition hover:text-primary ${isActive('/discover/activities') ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-on-surface/80'}`}
              >
                Activities
              </Link>
              <Link 
                to="/trips/trip-india-1/calendar" 
                className={`transition hover:text-primary ${location.pathname.includes('/calendar') ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-on-surface/80'}`}
              >
                Calendar
              </Link>

              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`flex items-center space-x-1 transition hover:text-primary ${isActive('/admin') ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-on-surface/80'}`}
                >
                  <ShieldCheck className="w-4 h-4 text-tertiary" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>
          )}

          {/* Action CTAs & Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Live Detected User Location Badge */}
            {userLoc?.city && (
              <Link
                to="/discover/activities"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low border border-outline-variant/70 rounded-xl text-xs font-mono font-semibold text-primary hover:border-primary transition"
                title={`Detected Location: ${userLoc.formatted}`}
              >
                <MapPin className="w-3.5 h-3.5 text-primary animate-bounce" />
                <span>{userLoc.city}</span>
              </Link>
            )}

            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-on-surface/80 hover:text-primary transition rounded-full hover:bg-surface-container-low cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-surface-container border border-primary/40 text-primary rounded-xl hover:bg-primary hover:text-white transition shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span>AI Architect</span>
                </button>

                <Link
                  to="/trips/create"
                  className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-primary text-white rounded-xl hover:bg-primary-container transition shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Plan Trip</span>
                </Link>

                {/* Profile Picture Avatar Link */}
                <div className="relative group pl-2 border-l border-outline-variant/60">
                  <Link to="/profile" className="flex items-center space-x-2 focus:outline-none" title="Profile Settings">
                    <img 
                      src={user?.avatar || "/default_avatar.png"} 
                      alt={user?.name || "User Avatar"} 
                      className="w-10 h-10 object-cover rounded-full border-2 border-primary/50 group-hover:border-primary transition shadow-sm"
                    />
                  </Link>
                </div>

                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="p-2 text-on-surface/60 hover:text-error transition cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-surface hover:text-primary transition"
                >
                  Log In
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-primary text-white rounded-xl hover:bg-primary-container transition shadow-sm"
                >
                  Join GlobeTrotter
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-on-surface rounded-full"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-on-surface hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-outline-variant bg-surface px-4 pt-3 pb-6 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 pb-3 border-b border-outline-variant">
                  <img 
                    src={user?.avatar || "/default_avatar.png"} 
                    alt={user?.name || "User Avatar"} 
                    className="w-10 h-10 object-cover rounded-full border-2 border-primary"
                  />
                  <div>
                    <span className="font-serif font-bold text-on-surface block">{user?.name}</span>
                    <span className="text-xs text-secondary block">{user?.email}</span>
                  </div>
                </div>

                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-on-surface hover:text-primary">Dashboard</Link>
                <Link to="/trips" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-on-surface hover:text-primary">My Trips</Link>
                <Link to="/discover/destinations" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-on-surface hover:text-primary">Destinations</Link>
                <Link to="/discover/activities" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-on-surface hover:text-primary">Activities</Link>
                <Link to="/trips/trip-india-1/calendar" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-on-surface hover:text-primary">Calendar</Link>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-on-surface hover:text-primary">Profile & Settings</Link>
                
                <div className="pt-3 border-t border-outline-variant/60 flex flex-col space-y-2">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setIsAiModalOpen(true); }}
                    className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-semibold uppercase bg-surface-container border border-primary text-primary rounded-xl"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AI Trip Architect</span>
                  </button>
                  <Link
                    to="/trips/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-semibold uppercase bg-primary text-white rounded-xl"
                  >
                    Plan New Trip
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="w-full text-left py-2 text-xs font-semibold text-error"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 text-sm font-semibold border border-outline rounded-xl">Log In</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 text-sm font-semibold bg-primary text-white rounded-xl">Join GlobeTrotter</Link>
              </div>
            )}
          </div>
        )}
      </header>

      <AITripModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
