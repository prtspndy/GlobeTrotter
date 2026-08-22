import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
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
    <div className="min-h-screen flex bg-background text-on-surface antialiased">
      
      {/* Left Side: Editorial Image & Branding */}
      <div className="hidden lg:flex w-[48%] relative flex-col justify-between overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80')` }}
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

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-[52%] flex flex-col justify-center items-center p-8 lg:p-16 bg-surface">
        <div className="w-full max-w-md flex flex-col gap-6">
          
          <div className="text-left flex flex-col gap-2">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-on-surface">
              Join GlobeTrotter
            </h2>
            <p className="text-sm text-on-surface-variant">
              Create your account to unlock personalized multi-city trip planning.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-error-container/60 border border-error/40 text-on-error-container text-xs rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="relative w-full group">
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-end">
                <span className="material-symbols-outlined text-secondary absolute left-0 bottom-2 text-xl">
                  person
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prashant Sharma"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 pl-8 pr-0 text-on-surface text-sm transition-colors placeholder-secondary/60"
                />
              </div>
            </div>

            <div className="relative w-full group">
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Email address
              </label>
              <div className="relative flex items-end">
                <span className="material-symbols-outlined text-secondary absolute left-0 bottom-2 text-xl">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 pl-8 pr-0 text-on-surface text-sm transition-colors placeholder-secondary/60"
                />
              </div>
            </div>

            <div className="relative w-full group">
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-end">
                <span className="material-symbols-outlined text-secondary absolute left-0 bottom-2 text-xl">
                  lock
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 pl-8 pr-0 text-on-surface text-sm transition-colors placeholder-secondary/60"
                />
              </div>
            </div>

            <div className="relative w-full group">
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative flex items-end">
                <span className="material-symbols-outlined text-secondary absolute left-0 bottom-2 text-xl">
                  lock_reset
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary pb-2 pl-8 pr-0 text-on-surface text-sm transition-colors placeholder-secondary/60"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded-sm text-primary focus:ring-primary border-outline accent-primary"
              />
              <label htmlFor="terms" className="text-xs text-secondary cursor-pointer">
                I agree to the <span className="text-on-surface underline font-medium">Terms of Service</span> and <span className="text-on-surface underline font-medium">Privacy Policy</span>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm shadow-paper hover:bg-primary-container transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
