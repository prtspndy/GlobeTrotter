import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      register(name, email, password);
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      googleLogin();
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 sm:p-10 border border-outline/40 shadow-2xl rounded-sm">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 bg-primary text-white font-serif text-2xl font-bold items-center justify-center rounded-sm shadow-paper mb-2">
            GT
          </div>
          <h2 className="font-serif text-3xl font-bold text-on-surface tracking-tight">
            Join the Journey
          </h2>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider">
            Create your GlobeTrotter traveler profile
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-error-container text-on-error-container border border-error/30 rounded-sm flex items-center space-x-2 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexandra Vance"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexandra@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center space-x-2 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-primary-container disabled:opacity-50 transition shadow-paper mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/60"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface px-3 text-outline tracking-wider font-semibold">
              Or
            </span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3 py-2.5 bg-surface border border-outline/50 text-on-surface font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-surface-container transition shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Redirect */}
        <p className="text-center text-xs text-on-surface-variant pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
