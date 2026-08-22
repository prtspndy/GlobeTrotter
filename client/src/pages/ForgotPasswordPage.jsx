import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-surface p-8 sm:p-10 border border-outline/40 shadow-2xl rounded-sm text-center">
        
        <div className="inline-flex w-12 h-12 bg-primary/10 text-primary font-serif text-2xl font-bold items-center justify-center rounded-sm mx-auto mb-2">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl font-bold text-on-surface">
          Recover Account
        </h2>

        {submitted ? (
          <div className="space-y-4 p-4 bg-surface-container-low border border-outline/40 rounded-sm text-left">
            <div className="flex items-center space-x-2 text-primary font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Reset Link Transmitted</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We have dispatched a secure password reset link to <strong className="text-on-surface">{email}</strong>. The link expires in 15 minutes.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-primary uppercase tracking-wider pt-2 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              Enter your registered GlobeTrotter account email address to receive an expiring reset link.
            </p>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Account Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3 py-2.5 text-sm bg-surface-container-low border border-outline/50 rounded-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-primary-container transition shadow-paper"
            >
              Send Reset Authorization
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-on-surface-variant hover:text-primary transition">
                &larr; Return to Sign In
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
