import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (!agreeTerms) {
      return setError('Please agree to the Terms of Service & Privacy Policy.');
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch bg-background text-on-surface antialiased min-h-[calc(100vh-80px)]">
      
      {/* Left Side: Editorial Hero Image & Branding (Fills 100% Height of Section - UNCHANGED) */}
      <div className="hidden lg:flex lg:w-[48%] relative flex-col justify-between overflow-hidden self-stretch min-h-full">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
          alt="Travel Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/60 via-transparent to-transparent" />

        <div className="relative z-10 p-16 flex flex-col gap-8 h-full justify-between text-white">
          <div>
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
                GT
              </div>
              <span className="font-serif text-2xl font-bold uppercase tracking-tight text-white">
                GlobeTrotter
              </span>
            </Link>
          </div>

          <div className="max-w-md">
            <span className="font-label-caps text-xs text-primary-fixed tracking-[0.2em] uppercase mb-4 block opacity-90 font-semibold">
              JOIN THE GLOBAL EXPEDITION
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Begin your next travel story.
            </h1>
            <p className="text-base text-surface-container-low/90 leading-relaxed font-light">
              Craft multi-city itineraries, estimate expenses, explore activities, and share memorable journeys.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-surface-container-high/80 w-full max-w-sm border-t border-white/20 pt-4">
            <span>Tokyo</span>
            <div className="flex-grow border-t border-dashed border-primary-container opacity-60" />
            <span>Kyoto</span>
            <div className="flex-grow border-t border-dashed border-primary-container opacity-60" />
            <span>Osaka</span>
          </div>
        </div>
      </div>

      {/* Right Side: Improved Modern Signup Form Canvas */}
      <div className="w-full lg:w-[52%] flex flex-col justify-center items-center p-8 lg:p-16 bg-surface self-stretch">
        <div className="w-full max-w-md flex flex-col gap-8">
          
          <div className="text-left flex flex-col gap-2">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-on-surface">
              Join GlobeTrotter
            </h2>
            <p className="text-sm text-on-surface-variant">
              Create your account to unlock personalized multi-city trip planning.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-error-container/60 border border-error/40 text-on-error-container text-xs rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-base">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            
            {/* FULL NAME FIELD */}
            <div className="space-y-2 group">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name"
                  required
                  className="w-full h-[52px] bg-surface-container-low border border-outline-variant rounded-xl pl-12 pr-4 text-on-surface text-sm font-medium placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline transition-all duration-200"
                />
              </div>
            </div>

            {/* EMAIL ADDRESS FIELD */}
            <div className="space-y-2 group">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter a email."
                  required
                  className="w-full h-[52px] bg-surface-container-low border border-outline-variant rounded-xl pl-12 pr-4 text-on-surface text-sm font-medium placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline transition-all duration-200"
                />
              </div>
            </div>

            {/* PASSWORD FIELD WITH VISIBILITY TOGGLE */}
            <div className="space-y-2 group">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-[52px] bg-surface-container-low border border-outline-variant rounded-xl pl-12 pr-12 text-on-surface text-sm font-medium placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-on-surface focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD FIELD WITH VISIBILITY TOGGLE */}
            <div className="space-y-2 group">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-[52px] bg-surface-container-low border border-outline-variant rounded-xl pl-12 pr-12 text-on-surface text-sm font-medium placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-on-surface focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* TERMS & PRIVACY CHECKBOX */}
            <div className="flex items-center space-x-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded-md border-outline-variant text-primary focus:ring-primary focus:ring-2 focus:ring-primary/20 accent-primary cursor-pointer transition"
              />
              <label htmlFor="terms" className="text-xs text-secondary cursor-pointer leading-relaxed select-none">
                I agree to the <span className="text-on-surface underline font-semibold hover:text-primary transition">Terms of Service</span> and <span className="text-on-surface underline font-semibold hover:text-primary transition">Privacy Policy</span>.
              </label>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] mt-2 bg-primary text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-paper hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary/30 transition flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="text-center text-xs text-secondary mt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
