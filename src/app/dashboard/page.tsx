"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { FacilitySelect, DashboardStats, MonitoringChart, RecentDocuments, ComplianceStatus } from '../../components/dashboard/DashboardComponents';
import { useAuth } from '../../lib/auth-context';

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Please log in to view the dashboard.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
          <FacilitySelect onSelect={(id) => setSelectedFacilityId(id)} />
        </div>

        {selectedFacilityId && (
          <>
            <DashboardStats facilityId={selectedFacilityId} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-8">
                <MonitoringChart />
              </div>
              <div className="lg:col-span-4">
                <ComplianceStatus facilityId={selectedFacilityId} />
              </div>
            </div>
            
            <div className="mt-6">
              <RecentDocuments />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
