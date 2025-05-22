"use client";

import React, { useState, useEffect } from 'react';

export const ComplianceTable: React.FC<{ facilityId?: number }> = ({ facilityId }) => {
  const [data, setData] = useState([
    { id: 1, requirement: 'Principle 1: Accountability', status: 'Compliant', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 2, requirement: 'Principle 2: Risk Management', status: 'Compliant', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 3, requirement: 'Principle 3: Emergency Response', status: 'Attention Needed', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 4, requirement: 'Principle 4: Public Disclosure', status: 'Compliant', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 5, requirement: 'Principle 5: Design', status: 'Compliant', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 6, requirement: 'Principle 6: Construction', status: 'Compliant', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 7, requirement: 'Principle 7: Operation', status: 'Compliant', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' },
    { id: 8, requirement: 'Principle 8: Closure', status: 'Not Applicable', lastAssessment: '2025-03-20', nextAssessment: '2025-09-20' }
  ]);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Requirement</th>
                <th>Status</th>
                <th>Last Assessment</th>
                <th>Next Assessment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.requirement}</td>
                  <td>
                    <span className={`badge ${
                      item.status === 'Compliant' ? 'bg-success' : 
                      item.status === 'Attention Needed' ? 'bg-warning text-dark' :
                      item.status === 'Not Applicable' ? 'bg-secondary' : 'bg-danger'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.lastAssessment).toLocaleDateString()}</td>
                  <td>{new Date(item.nextAssessment).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">View Details</button>
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

export const ComplianceSummary: React.FC<{ facilityId?: number }> = ({ facilityId }) => {
  const [summary, setSummary] = useState({
    overallStatus: 'Compliant',
    complianceScore: 92,
    lastAssessment: '2025-03-20',
    nextAssessment: '2025-09-20',
    attentionItems: 1,
    nonCompliantItems: 0
  });

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="card-title">GISTM Compliance Summary</h5>
            <p className="text-muted mb-0">Last assessment: {new Date(summary.lastAssessment).toLocaleDateString()}</p>
            <p className="text-muted">Next assessment: {new Date(summary.nextAssessment).toLocaleDateString()}</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-md-end">
              <div className="me-3">
                <div className="display-6 mb-0">{summary.complianceScore}%</div>
                <div className="text-muted small">Compliance Score</div>
              </div>
              <div>
                <span className={`badge ${
                  summary.overallStatus === 'Compliant' ? 'bg-success' : 
                  summary.overallStatus === 'Attention Needed' ? 'bg-warning text-dark' : 'bg-danger'
                } p-2`}>
                  {summary.overallStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <hr />
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body text-center">
                <div className="display-6 mb-2 text-success">
                  {8 - summary.attentionItems - summary.nonCompliantItems}
                </div>
                <div className="text-muted">Compliant Items</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body text-center">
                <div className="display-6 mb-2 text-warning">
                  {summary.attentionItems}
                </div>
                <div className="text-muted">Items Needing Attention</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body text-center">
                <div className="display-6 mb-2 text-danger">
                  {summary.nonCompliantItems}
                </div>
                <div className="text-muted">Non-Compliant Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ComplianceAssessmentForm: React.FC = () => {
  const [requirement, setRequirement] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    // In a real application, this would submit to the API
    // For demo purposes, we'll simulate a successful submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setRequirement('');
      setStatus('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Update Compliance Assessment</h5>
        
        {success && (
          <div className="alert alert-success">
            Compliance assessment updated successfully!
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="requirement" className="form-label">GISTM Requirement</label>
            <select
              className="form-select"
              id="requirement"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              required
            >
              <option value="">Select Requirement</option>
              <option value="1">Principle 1: Accountability</option>
              <option value="2">Principle 2: Risk Management</option>
              <option value="3">Principle 3: Emergency Response</option>
              <option value="4">Principle 4: Public Disclosure</option>
              <option value="5">Principle 5: Design</option>
              <option value="6">Principle 6: Construction</option>
              <option value="7">Principle 7: Operation</option>
              <option value="8">Principle 8: Closure</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Compliance Status</label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Compliant">Compliant</option>
              <option value="Attention Needed">Attention Needed</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="notes" className="form-label">Assessment Notes</label>
            <textarea
              className="form-control"
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ backgroundColor: '#006039', borderColor: '#006039' }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Updating...
              </>
            ) : 'Update Assessment'}
          </button>
        </form>
      </div>
    </div>
  );
};
