import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface border border-outline-variant p-8 sm:p-10 shadow-paper space-y-6 text-center">
        
        <Link to="/" className="inline-flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm">
            GT
          </div>
          <span className="font-serif text-xl font-bold uppercase tracking-tight text-on-surface">
            GlobeTrotter
          </span>
        </Link>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-on-surface">
            Verify Your Email
          </h1>
          <p className="text-xs text-secondary leading-relaxed">
            We've sent a 6-digit verification code to your email address. Enter the code below to complete registration.
          </p>
        </div>

        {verified ? (
          <div className="p-4 bg-surface-container-low border border-primary/40 text-center space-y-2">
            <span className="material-symbols-outlined text-primary text-4xl animate-bounce">verified</span>
            <h3 className="font-serif text-lg font-bold text-on-surface">Verification Successful!</h3>
            <p className="text-xs text-secondary">Redirecting to your travel dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-input-${idx}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-10 h-12 text-center font-serif text-xl font-bold bg-transparent border-0 border-b-2 border-outline focus:border-primary focus:ring-0 text-on-surface"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm shadow-paper hover:bg-primary-container transition flex items-center justify-center space-x-2"
            >
              <span>Verify & Continue</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>

            <p className="text-xs text-secondary">
              Didn't receive code?{' '}
              <button type="button" className="font-semibold text-primary hover:underline">
                Resend Code
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
