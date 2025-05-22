"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { QueryInterface, QueryHistory } from '../../components/query/QueryComponents';
import { useAuth } from '../../lib/auth-context';

export default function AiQuery() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Please log in to use the AI Query Assistant.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">AI Query Assistant</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <QueryInterface />
          </div>
          <div className="lg:col-span-4">
            <QueryHistory />
          </div>
        </div>
      </div>
    </Layout>
  );
}
