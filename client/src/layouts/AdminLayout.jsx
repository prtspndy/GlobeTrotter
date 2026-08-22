import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <Footer />
    </div>
  );
}
