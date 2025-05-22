"use client";

import React, { useState, useEffect } from 'react';

export const DocumentList: React.FC<{ facilityId?: number }> = ({ facilityId }) => {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Annual Geotechnical Inspection Report', date: '2025-04-15', type: 'Report', facility: 'North Dam' },
    { id: 2, title: 'Quarterly Environmental Monitoring Results', date: '2025-04-01', type: 'Data', facility: 'North Dam' },
    { id: 3, title: 'GISTM Compliance Assessment', date: '2025-03-20', type: 'Assessment', facility: 'South Dam' },
    { id: 4, title: 'Tailings Dam Safety Review', date: '2025-03-10', type: 'Review', facility: 'East Dam' },
    { id: 5, title: 'Piezometer Installation Report', date: '2025-02-15', type: 'Report', facility: 'North Dam' },
    { id: 6, title: 'Water Quality Analysis', date: '2025-02-01', type: 'Data', facility: 'South Dam' },
    { id: 7, title: 'Seismic Hazard Assessment', date: '2025-01-20', type: 'Assessment', facility: 'East Dam' },
    { id: 8, title: 'Embankment Construction Records', date: '2025-01-05', type: 'Records', facility: 'North Dam' }
  ]);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = documents;
    
    if (facilityId) {
      // In a real app, this would filter by actual facility ID
      // For demo, we'll just filter by the first letter of the facility name
      const facilityMap = {
        1: 'North Dam',
        2: 'South Dam',
        3: 'East Dam'
      };
      const facilityName = facilityMap[facilityId as keyof typeof facilityMap];
      filtered = documents.filter(doc => doc.facility === facilityName);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDocuments(filtered);
  }, [documents, facilityId, searchTerm]);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Type</th>
                <th>Facility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>{new Date(doc.date).toLocaleDateString()}</td>
                  <td><span className="badge bg-light text-dark">{doc.type}</span></td>
                  <td>{doc.facility}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-primary">View</button>
                      <button className="btn btn-outline-secondary">Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-4">
            <p className="text-muted">No documents found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const DocumentUploadForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [facility, setFacility] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    // In a real application, this would upload to the API
    // For demo purposes, we'll simulate a successful upload
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTitle('');
      setFacility('');
      setDocumentType('');
      setFile(null);
    }, 1500);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        {success && (
          <div className="alert alert-success">
            Document uploaded successfully!
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Document Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="facility" className="form-label">Facility</label>
              <select
                className="form-select"
                id="facility"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                required
              >
                <option value="">Select Facility</option>
                <option value="1">North Dam</option>
                <option value="2">South Dam</option>
                <option value="3">East Dam</option>
              </select>
            </div>
            
            <div className="col-md-6">
              <label htmlFor="documentType" className="form-label">Document Type</label>
              <select
                className="form-select"
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="Report">Report</option>
                <option value="Data">Data</option>
                <option value="Assessment">Assessment</option>
                <option value="Review">Review</option>
                <option value="Records">Records</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="file" className="form-label">Document File</label>
            <input
              type="file"
              className="form-control"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            <div className="form-text">Supported formats: PDF, DOCX, XLSX, CSV, JPG, PNG</div>
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
                Uploading...
              </>
            ) : 'Upload Document'}
          </button>
        </form>
      </div>
    </div>
  );
};
