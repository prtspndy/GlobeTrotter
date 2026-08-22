import React, { useState } from 'react';
import { Camera, Sun, Moon, Check, Save, User, Mail, Phone, MapPin, Globe, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { useTheme } from '../context/ThemeContext';

export default function ProfileSettingsPage() {
  const { user, updateProfile } = useAuth();
  const { trips } = useTrip();
  const { isDarkMode, toggleTheme } = useTheme();

  // Profile Form States
  const [avatar, setAvatar] = useState(user?.avatar || "/default_avatar.jpg");
  const [name, setName] = useState(user?.name || 'Prashant Sharma');
  const [email, setEmail] = useState(user?.email || 'prashant.sharma@globetrotter.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [homeCity, setHomeCity] = useState(user?.homeCity || 'Mumbai, India');
  const [currency, setCurrency] = useState(user?.currency || 'INR');
  const [travelStyle, setTravelStyle] = useState(user?.travelStyle || ['Heritage', 'Food & Dining', 'Culture']);
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '+91 98123 45678');
  
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalStops = trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0);
  const totalActivities = trips.reduce((acc, t) => {
    return acc + (t.stops?.reduce((sAcc, s) => sAcc + (s.activities?.length || 0), 0) || 0);
  }, 0);

  const PRESET_AVATARS = [
    "/default_avatar.jpg",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  ];

  const applyAvatar = (newAvatarUrl) => {
    setAvatar(newAvatarUrl);
    if (updateProfile) {
      updateProfile({ avatar: newAvatarUrl });
    }
    setShowPhotoModal(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        applyAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUrlSubmit = (e) => {
    e.preventDefault();
    if (photoUrlInput.trim()) {
      applyAvatar(photoUrlInput.trim());
      setPhotoUrlInput('');
    }
  };

  const toggleInterest = (tag) => {
    if (travelStyle.includes(tag)) {
      setTravelStyle(travelStyle.filter((t) => t !== tag));
    } else {
      setTravelStyle([...travelStyle, tag]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile({
        name,
        email,
        avatar,
        phone,
        homeCity,
        currency,
        travelStyle,
        emergencyContact
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-surface pb-24">
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-10">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b border-outline-variant pb-6">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-semibold">
              ACCOUNT & PREFERENCES
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-on-surface">Profile Settings</h1>
          </div>

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-xs font-semibold text-on-surface hover:border-primary transition shadow-paper cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </header>

        {/* Profile Hero Card with Avatar Upload */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-surface border border-outline-variant p-8 rounded-2xl shadow-paper">
          
          {/* Avatar & Camera Badge */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-md bg-surface-container-low">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Camera Change Button */}
              <button
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-container transition border-2 border-surface cursor-pointer"
                title="Change profile photo"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-on-surface">{name}</h2>
              <p className="text-xs text-secondary">{email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-surface-container text-primary font-mono text-[10px] font-bold uppercase tracking-wider rounded-md border border-primary/20">
                Verified GlobeTrotter Explorer
              </span>
            </div>
          </div>

          {/* Travel Stats Ribbon */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6 border-t md:border-t-0 md:border-l border-outline-variant pt-6 md:pt-0 md:pl-8">
            <div className="text-center md:text-left space-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">flight</span>
              <span className="font-serif text-3xl font-bold text-on-surface block">{trips.length}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Trips Created</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">location_city</span>
              <span className="font-serif text-3xl font-bold text-on-surface block">{totalStops}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Cities Logged</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">local_activity</span>
              <span className="font-serif text-3xl font-bold text-on-surface block">{totalActivities}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Activities Done</span>
            </div>
          </div>

        </section>

        {/* Required Profile & Preferences Form */}
        <section className="bg-surface border border-outline-variant p-8 rounded-2xl shadow-paper space-y-8">
          
          <div className="flex justify-between items-center border-b border-outline-variant pb-4">
            <h2 className="font-serif text-2xl font-bold text-on-surface flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              <span>Required Personal Details</span>
            </h2>

            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-4 h-4" /> Profile updated successfully!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Full Name <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-4 h-4 text-secondary" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-[50px] bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Email Address <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-secondary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-[50px] bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Phone Number <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 w-4 h-4 text-secondary" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full h-[50px] bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              {/* Home City */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Home Location / Country <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-4 w-4 h-4 text-secondary" />
                  <input
                    type="text"
                    value={homeCity}
                    onChange={(e) => setHomeCity(e.target.value)}
                    required
                    className="w-full h-[50px] bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              {/* Preferred Currency */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Base Currency <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <Globe className="absolute left-4 w-4 h-4 text-secondary" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-[50px] bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="INR">INR (₹) — Indian Rupee</option>
                    <option value="USD">USD ($) — US Dollar</option>
                    <option value="EUR">EUR (€) — Euro</option>
                  </select>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Emergency Contact
                </label>
                <div className="relative flex items-center">
                  <Shield className="absolute left-4 w-4 h-4 text-secondary" />
                  <input
                    type="tel"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="+91 Emergency Contact"
                    className="w-full h-[50px] bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Travel Interests Tags */}
            <div className="space-y-3 pt-4 border-t border-outline-variant">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Travel Style & Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {['Heritage', 'Food & Dining', 'Culture', 'Beach', 'Nature', 'Adventure', 'Spiritual', 'Wildlife'].map((tag) => {
                  const isSelected = travelStyle.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface-container-low border-outline-variant text-on-surface hover:border-primary'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="h-[50px] px-8 bg-primary text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-paper hover:bg-primary-container transition flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>

          </form>
        </section>

        {/* Photo Upload Modal */}
        {showPhotoModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
              
              <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                <h3 className="font-serif text-xl font-bold text-on-surface">Update Profile Photo</h3>
                <button onClick={() => setShowPhotoModal(false)} className="text-secondary hover:text-on-surface text-xl">
                  &times;
                </button>
              </div>

              {/* Upload File Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">
                  Upload from Device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-on-surface file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
                />
              </div>

              {/* Image URL Input */}
              <form onSubmit={handlePhotoUrlSubmit} className="space-y-2">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">
                  Or Enter Photo Web Link / URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 h-[42px] bg-surface-container-low border border-outline-variant rounded-xl px-3 text-xs text-on-surface outline-none"
                  />
                  <button type="submit" className="px-4 bg-primary text-white text-xs font-semibold rounded-xl">
                    Apply
                  </button>
                </div>
              </form>

              {/* Or Preset Avatars */}
              <div className="space-y-2 pt-2 border-t border-outline-variant">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">
                  Select Preset Avatar
                </label>
                <div className="flex gap-3">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => applyAvatar(url)}
                      className="w-14 h-14 rounded-full overflow-hidden border-2 border-outline-variant hover:border-primary transition cursor-pointer"
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
