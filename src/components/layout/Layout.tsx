"use client";

import React from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <nav className="bg-[#006039] text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                <span className="text-white">Tailings</span><span className="text-[#d4af37]">IQ</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="hover:text-[#d4af37] transition-colors">Dashboard</Link>
                <Link href="/documents" className="hover:text-[#d4af37] transition-colors">Documents</Link>
                <Link href="/monitoring" className="hover:text-[#d4af37] transition-colors">Monitoring</Link>
                <Link href="/compliance" className="hover:text-[#d4af37] transition-colors">Compliance</Link>
                <Link href="/query" className="hover:text-[#d4af37] transition-colors">AI Query</Link>
                <Link href="/auth" className="hover:text-[#d4af37] transition-colors">Login</Link>
              </div>
              <button className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-bold text-lg mb-3">TailingsIQ</h5>
              <p className="text-gray-600">AI for Tailings Management</p>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-3">Contact</h5>
              <p className="text-gray-600">
                <strong>Geotesta T/A TailingsIQ</strong><br />
                125 St Georges Tce, Level 11<br />
                Perth, Western Australia 6000<br />
                <a href="tel:1300852216" className="hover:text-[#006039]">1300 852 216</a><br />
                <a href="mailto:tailingsiq@geotesta.com.au" className="hover:text-[#006039]">tailingsiq@geotesta.com.au</a>
              </p>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-3">Links</h5>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-gray-600 hover:text-[#006039]">Dashboard</Link></li>
                <li><Link href="/query" className="text-gray-600 hover:text-[#006039]">AI Query</Link></li>
                <li><Link href="/auth" className="text-gray-600 hover:text-[#006039]">Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-gray-600 text-center">
              &copy; {new Date().getFullYear()} Geotesta T/A TailingsIQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
