"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { LoginForm, RegisterForm } from '../../components/auth/AuthForms';
import { useAuth } from '../../lib/auth-context';

export default function Auth() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  if (user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            You are already logged in as {user.email}
          </div>
          <a href="/dashboard" className="bg-[#006039] hover:bg-[#004d2e] text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Go to Dashboard
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b">
              <div className="flex">
                <button 
                  className={`px-4 py-3 font-medium ${activeTab === 'login' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button 
                  className={`px-4 py-3 font-medium ${activeTab === 'register' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="p-6">
              {activeTab === 'login' ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
