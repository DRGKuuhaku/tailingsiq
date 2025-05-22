"use client";

import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useAuth } from '../lib/auth-context';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-[#006039]">Tailings</span>
            <span className="text-[#d4af37]">IQ</span>
          </h1>
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="border-t-2 w-10 mr-3 border-[#006039]"></div>
              <p className="uppercase tracking-wider font-bold text-[#006039]">
                AI-DRIVEN KNOWLEDGE BASE FOR TAILINGS STORAGE FACILITIES
              </p>
              <div className="border-t-2 w-10 ml-3 border-[#006039]"></div>
            </div>
            <p className="mt-2 text-lg italic text-gray-600">
              Revolutionize how you manage risks, monitor performance, and ensure compliance with industry standards
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href="/dashboard" className="bg-[#006039] hover:bg-[#004d2e] text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Go to Dashboard
              </Link>
            ) : (
              <Link href="/auth" className="bg-[#006039] hover:bg-[#004d2e] text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Get Started
              </Link>
            )}
            <Link href="/query" className="border border-gray-300 hover:border-[#006039] text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors">
              Try AI Chat
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md h-full">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#006039]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Intelligent Dashboard</h3>
                <p className="text-gray-600">Real-time monitoring of key performance indicators with automated alerts and trend analysis.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md h-full">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#006039]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Document Management</h3>
                <p className="text-gray-600">Centralized repository for all tailings-related documentation with intelligent search capabilities.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md h-full">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#006039]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">GISTM Compliance</h3>
                <p className="text-gray-600">Automated tracking of compliance with Global Industry Standard on Tailings Management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Query Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">AI-Powered Knowledge Assistant</h2>
              <p className="text-lg mb-6">Ask questions in natural language and get instant answers based on your tailings facility data.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#006039] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Query monitoring data trends and anomalies
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#006039] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access information from technical documents
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#006039] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Check compliance status and requirements
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#006039] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generate reports and visualizations on demand
                </li>
              </ul>
              <Link href="/query" className="inline-block mt-6 bg-[#006039] hover:bg-[#004d2e] text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Try AI Chat
              </Link>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-[#006039] text-white p-3 rounded-lg max-w-[80%]">
                        What are the current piezometer readings for North Dam?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        The piezometer readings for North Dam show stable water levels within the expected range. The most recent measurements from April 22, 2025 indicate pressures between 12.3 kPa and 18.7 kPa, which is within the normal operating parameters.
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#006039] text-white p-3 rounded-lg max-w-[80%]">
                        Is the facility compliant with GISTM requirements?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        Yes, the North Dam facility is currently compliant with GISTM requirements. The last compliance assessment was completed on March 15, 2025, with all 15 principal requirements met. The next scheduled assessment is due on September 15, 2025.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Tailings Management?</h2>
            <p className="text-lg mb-8">Contact us today to schedule a demo and see how TailingsIQ can help your organization.</p>
            <Link href="/auth" className="bg-[#006039] hover:bg-[#004d2e] text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
