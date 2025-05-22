"use client";

import React, { useState, useEffect } from 'react';

export const FacilitySelect: React.FC<{ onSelect: (id: number) => void }> = ({ onSelect }) => {
  const [facilities, setFacilities] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch('/api/facilities');
        if (response.ok) {
          const data = await response.json();
          setFacilities(data);
          if (data.length > 0) {
            onSelect(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching facilities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [onSelect]);

  if (loading) {
    return <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>;
  }

  return (
    <select 
      className="form-select" 
      onChange={(e) => onSelect(Number(e.target.value))}
      style={{ maxWidth: '200px' }}
    >
      {facilities.map((facility) => (
        <option key={facility.id} value={facility.id}>
          {facility.name}
        </option>
      ))}
    </select>
  );
};

export const DashboardStats: React.FC<{ facilityId: number }> = ({ facilityId }) => {
  const [stats, setStats] = useState({
    documentCount: 0,
    monitoringPoints: 0,
    complianceScore: 0,
    alertCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch from the API
        // For now, we'll use mock data
        setStats({
          documentCount: 124,
          monitoringPoints: 48,
          complianceScore: 92,
          alertCount: 2
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [facilityId]);

  if (loading) {
    return <div className="spinner-border text-secondary" role="status"></div>;
  }

  return (
    <div className="row g-4">
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-0">Documents</h5>
            <p className="display-6 mb-0">{stats.documentCount}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-0">Monitoring Points</h5>
            <p className="display-6 mb-0">{stats.monitoringPoints}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-0">Compliance Score</h5>
            <p className="display-6 mb-0">{stats.complianceScore}%</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: stats.alertCount > 0 ? '#fff8e1' : 'white' }}>
          <div className="card-body">
            <h5 className="card-title text-muted mb-0">Active Alerts</h5>
            <p className="display-6 mb-0" style={{ color: stats.alertCount > 0 ? '#ff9800' : 'inherit' }}>
              {stats.alertCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MonitoringChart: React.FC = () => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Monitoring Data</h5>
        <div className="chart-container" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <div className="mb-3">
              <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#006039' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-graph-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                </svg>
              </div>
            </div>
            <p className="text-muted">Monitoring data visualization would appear here</p>
            <p className="text-muted small">Last updated: April 28, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecentDocuments: React.FC = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Annual Geotechnical Inspection Report', date: '2025-04-15', type: 'Report' },
    { id: 2, title: 'Quarterly Environmental Monitoring Results', date: '2025-04-01', type: 'Data' },
    { id: 3, title: 'GISTM Compliance Assessment', date: '2025-03-20', type: 'Assessment' },
    { id: 4, title: 'Tailings Dam Safety Review', date: '2025-03-10', type: 'Review' }
  ]);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Recent Documents</h5>
          <a href="/documents" className="btn btn-sm btn-outline-secondary">View All</a>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>{new Date(doc.date).toLocaleDateString()}</td>
                  <td><span className="badge bg-light text-dark">{doc.type}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ComplianceStatus: React.FC<{ facilityId: number }> = ({ facilityId }) => {
  const [status, setStatus] = useState({
    overall: 'Compliant',
    lastAssessment: '2025-03-20',
    nextAssessment: '2025-09-20',
    requirements: [
      { id: 1, name: 'Accountability', status: 'Compliant' },
      { id: 2, name: 'Risk Management', status: 'Compliant' },
      { id: 3, name: 'Emergency Response', status: 'Attention Needed' },
      { id: 4, name: 'Public Disclosure', status: 'Compliant' }
    ]
  });

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">GISTM Compliance</h5>
        <div className="d-flex align-items-center mb-3">
          <div className="me-2">
            <span className="badge bg-success">Compliant</span>
          </div>
          <div className="small text-muted">
            Last assessment: {new Date(status.lastAssessment).toLocaleDateString()}
          </div>
        </div>
        <div className="list-group list-group-flush">
          {status.requirements.map((req) => (
            <div key={req.id} className="list-group-item px-0 py-2 border-0">
              <div className="d-flex justify-content-between align-items-center">
                <span>{req.name}</span>
                <span className={`badge ${req.status === 'Compliant' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 small text-muted">
          Next assessment due: {new Date(status.nextAssessment).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
