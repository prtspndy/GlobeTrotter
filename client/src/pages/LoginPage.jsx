import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
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
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80')` }}
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
              YOUR JOURNEY, BEAUTIFULLY ORGANIZED
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Every great journey starts with a plan.
            </h1>
            <p className="text-base text-surface-container-low/90 leading-relaxed font-light">
              Your itineraries, destinations, activities and budgets — all in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-surface-container-high/80 w-full max-w-sm border-t border-white/20 pt-4">
            <span>Rome</span>
            <div className="flex-grow border-t border-dashed border-primary-container opacity-60" />
            <span>Florence</span>
            <div className="flex-grow border-t border-dashed border-primary-container opacity-60" />
            <span>Paris</span>
          </div>
        </div>
      </div>

      {/* Right Side: Authentication Canvas */}
      <div className="w-full lg:w-[52%] flex flex-col justify-center items-center p-8 lg:p-16 bg-surface">
        <div className="w-full max-w-md flex flex-col gap-8">
          
          <div className="text-left flex flex-col gap-2">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-on-surface">
              Welcome back
            </h2>
            <p className="text-base text-on-surface-variant">
              Continue your journey. Log in to access your personalized trips.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-error-container/60 border border-error/40 text-on-error-container text-xs rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="relative w-full group">
              <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
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
              <div className="flex justify-between items-end mb-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm shadow-paper hover:bg-primary-container transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="px-3 text-xs uppercase tracking-widest text-outline font-semibold">Or</span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          <div className="text-center text-xs text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Join GlobeTrotter
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
