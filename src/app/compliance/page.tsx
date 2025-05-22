"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { ComplianceTable, ComplianceSummary, ComplianceForm } from '../../components/compliance/ComplianceComponents';
import { useAuth } from '../../lib/auth-context';

export default function Compliance() {
  const { user } = useAuth();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Please log in to view compliance data.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">GISTM Compliance</h1>

        <div className="border-b mb-6">
          <div className="flex">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'summary' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('details')}
            >
              Detailed Records
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'add' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('add')}
            >
              Add Record
            </button>
          </div>
        </div>

        {activeTab === 'summary' && (
          <ComplianceSummary facilityId={selectedFacilityId || undefined} />
        )}

        {activeTab === 'details' && (
          <ComplianceTable facilityId={selectedFacilityId || undefined} />
        )}

        {activeTab === 'add' && (
          <ComplianceForm />
        )}
      </div>
    </Layout>
  );
}
