import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface border border-outline-variant p-8 sm:p-10 shadow-paper space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm">
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
          <div className="bg-surface-container-low border border-primary/40 p-4 text-center space-y-3">
            <span className="material-symbols-outlined text-primary text-3xl">mark_email_read</span>
            <h3 className="font-serif text-base font-bold text-on-surface">Recovery Email Sent</h3>
            <p className="text-xs text-secondary leading-relaxed">
              We've dispatched reset instructions to <strong className="text-on-surface">{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="inline-block pt-2 text-xs font-semibold text-primary uppercase tracking-wider hover:underline">
              Return to Login &rarr;
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm shadow-paper hover:bg-primary-container transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Sending Instructions...' : 'Send Recovery Link'}</span>
              <span className="material-symbols-outlined text-lg">send</span>
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
