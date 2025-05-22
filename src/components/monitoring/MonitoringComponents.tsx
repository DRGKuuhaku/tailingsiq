"use client";

import React, { useState, useEffect } from 'react';

export const MonitoringDataTable: React.FC<{ facilityId?: number }> = ({ facilityId }) => {
  const [data, setData] = useState([
    { id: 1, date: '2025-04-28', type: 'Piezometer', location: 'P-101', value: '12.3 kPa', status: 'Normal' },
    { id: 2, date: '2025-04-28', type: 'Piezometer', location: 'P-102', value: '14.7 kPa', status: 'Normal' },
    { id: 3, date: '2025-04-28', type: 'Inclinometer', location: 'I-201', value: '0.5 mm', status: 'Normal' },
    { id: 4, date: '2025-04-28', type: 'Settlement', location: 'S-301', value: '2.1 mm', status: 'Normal' },
    { id: 5, date: '2025-04-27', type: 'Piezometer', location: 'P-101', value: '12.1 kPa', status: 'Normal' },
    { id: 6, date: '2025-04-27', type: 'Piezometer', location: 'P-102', value: '14.5 kPa', status: 'Normal' },
    { id: 7, date: '2025-04-27', type: 'Inclinometer', location: 'I-201', value: '0.5 mm', status: 'Normal' },
    { id: 8, date: '2025-04-27', type: 'Settlement', location: 'S-301', value: '2.0 mm', status: 'Normal' }
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    let filtered = data;
    
    if (filterType) {
      filtered = filtered.filter(item => item.type === filterType);
    }
    
    setFilteredData(filtered);
  }, [data, filterType]);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="mb-3">
          <div className="row g-2">
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Monitoring Types</option>
                <option value="Piezometer">Piezometer</option>
                <option value="Inclinometer">Inclinometer</option>
                <option value="Settlement">Settlement</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Location</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.type}</td>
                  <td>{item.location}</td>
                  <td>{item.value}</td>
                  <td>
                    <span className={`badge ${item.status === 'Normal' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-4">
            <p className="text-muted">No monitoring data found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const MonitoringCharts: React.FC<{ facilityId?: number }> = ({ facilityId }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Monitoring Trends</h5>
        
        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">Piezometer Readings</h6>
              </div>
              <div className="card-body">
                <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="text-center">
                    <div className="mb-3">
                      <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#006039' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-water" viewBox="0 0 16 16">
                          <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-muted small">Piezometer data visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">Inclinometer Readings</h6>
              </div>
              <div className="card-body">
                <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="text-center">
                    <div className="mb-3">
                      <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#006039' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-muted small">Inclinometer data visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">Settlement Monitoring</h6>
              </div>
              <div className="card-body">
                <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="text-center">
                    <div className="mb-3">
                      <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#006039' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-arrow-down" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-muted small">Settlement data visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">Rainfall Data</h6>
              </div>
              <div className="card-body">
                <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="text-center">
                    <div className="mb-3">
                      <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#006039' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-cloud-rain" viewBox="0 0 16 16">
                          <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-muted small">Rainfall data visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MonitoringDataForm: React.FC = () => {
  const [monitoringType, setMonitoringType] = useState('');
  const [location, setLocation] = useState('');
  const [value, setValue] = useState('');
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
      setMonitoringType('');
      setLocation('');
      setValue('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        {success && (
          <div className="alert alert-success">
            Monitoring data added successfully!
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="monitoringType" className="form-label">Monitoring Type</label>
              <select
                className="form-select"
                id="monitoringType"
                value={monitoringType}
                onChange={(e) => setMonitoringType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="Piezometer">Piezometer</option>
                <option value="Inclinometer">Inclinometer</option>
                <option value="Settlement">Settlement</option>
                <option value="Rainfall">Rainfall</option>
              </select>
            </div>
            
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">Location ID</label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="value" className="form-label">Value</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
              <span className="input-group-text">
                {monitoringType === 'Piezometer' ? 'kPa' : 
                 monitoringType === 'Inclinometer' || monitoringType === 'Settlement' ? 'mm' :
                 monitoringType === 'Rainfall' ? 'mm' : ''}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea
              className="form-control"
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
                Submitting...
              </>
            ) : 'Add Monitoring Data'}
          </button>
        </form>
      </div>
    </div>
  );
};
