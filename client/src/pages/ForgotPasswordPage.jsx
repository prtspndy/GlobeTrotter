import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface border border-outline-variant p-8 sm:p-10 rounded-2xl shadow-paper space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 mb-2">
            <div className="w-9 h-9 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-sm">
              GT
            </div>
            <span className="font-serif text-xl font-bold uppercase tracking-tight text-on-surface">
              GlobeTrotter
            </span>
          </Link>

          <h1 className="font-serif text-2xl font-bold text-on-surface">
            Account Recovery
          </h1>
          <p className="text-xs text-secondary leading-relaxed">
            Enter the email address associated with your GlobeTrotter account to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-surface-container-low border border-primary/40 p-6 text-center space-y-3 rounded-xl">
            <CheckCircle className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-serif text-base font-bold text-on-surface">Recovery Email Sent</h3>
            <p className="text-xs text-secondary leading-relaxed">
              We've dispatched reset instructions to <strong className="text-on-surface">{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="inline-block pt-2 text-xs font-semibold text-primary uppercase tracking-wider hover:underline">
              Return to Login &rarr;
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Email address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full h-[52px] bg-surface-container-low border border-outline-variant rounded-xl pl-12 pr-4 text-on-surface text-sm font-medium placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-primary text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-paper hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary/30 transition flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Sending Instructions...</span>
                </>
              ) : (
                <>
                  <span>Send Recovery Link</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-xs text-secondary pt-2">
              Remember your password?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
