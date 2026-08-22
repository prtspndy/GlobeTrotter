import React from 'react';
import Navbar from '../components/layout/Navbar';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-10 px-4">{children}</div>
    </div>
  );
}
