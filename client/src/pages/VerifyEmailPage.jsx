import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-surface p-8 sm:p-10 border border-outline/40 shadow-2xl rounded-sm text-center">
        
        <div className="inline-flex w-12 h-12 bg-tertiary/10 text-tertiary font-serif text-2xl font-bold items-center justify-center rounded-sm mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl font-bold text-on-surface">
          Verify Your Email
        </h2>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          We have dispatched a verification link to your inbox. Click the authorization button in your email to activate your GlobeTrotter profile.
        </p>

        <div className="pt-4 border-t border-outline-variant/60">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-container transition shadow-paper"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
