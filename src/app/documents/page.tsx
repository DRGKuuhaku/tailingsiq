"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { DocumentList, DocumentUploadForm } from '../../components/documents/DocumentComponents';
import { useAuth } from '../../lib/auth-context';

export default function Documents() {
  const { user } = useAuth();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Please log in to view documents.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Documents</h1>

        <div className="border-b mb-6">
          <div className="flex">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'list' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('list')}
            >
              Document Library
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'upload' ? 'text-[#006039] border-b-2 border-[#006039]' : 'text-gray-500 hover:text-[#006039]'}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Document
            </button>
          </div>
        </div>

        {activeTab === 'list' ? (
          <DocumentList facilityId={selectedFacilityId || undefined} />
        ) : (
          <DocumentUploadForm />
        )}
      </div>
    </Layout>
  );
}
