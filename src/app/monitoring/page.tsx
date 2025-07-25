"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { MonitoringDataTable, MonitoringCharts, MonitoringDataForm } from '../../components/monitoring/MonitoringComponents';
import { useAuth } from '../../lib/auth-context';

export default function Monitoring() {
  const { user } = useAuth();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('charts');

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Please log in to view monitoring data.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Monitoring Data</h1>

        <div className="border-b mb-6">
          <div className="flex">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'charts' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('charts')}
            >
              Charts
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'data' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('data')}
            >
              Data Table
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'add' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('add')}
            >
              Add Data
            </button>
          </div>
        </div>

        {activeTab === 'charts' && (
          <MonitoringCharts facilityId={selectedFacilityId || undefined} />
        )}

        {activeTab === 'data' && (
          <MonitoringDataTable facilityId={selectedFacilityId || undefined} />
        )}

        {activeTab === 'add' && (
          <MonitoringDataForm />
        )}
      </div>
    </Layout>
  );
}
