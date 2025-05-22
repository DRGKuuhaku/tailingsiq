import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    date?: string;
    section?: string;
  }>;
  visualizations?: Array<{
    type: string;
    title: string;
  }>;
}

export const QueryInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError('');
    const currentQuery = query;
    setQuery('');

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
          sources: data.sources,
          visualizations: data.visualizations
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to process query');
      }
    } catch (err) {
      console.error('Error processing query:', err);
      setError('An error occurred while processing your query');
      
      // Use mock response if API call fails
      const mockResponse = getMockResponse(currentQuery);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponse.answer,
        timestamp: new Date(),
        sources: mockResponse.sources,
        visualizations: mockResponse.visualizations
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">AI Query Assistant</h5>
        {messages.length > 0 && (
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={clearConversation}
          >
            Clear Conversation
          </button>
        )}
      </div>
      <div className="card-body p-0 d-flex flex-column">
        <div className="chat-messages p-3 flex-grow-1" style={{ minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}>
          {messages.length === 0 ? (
            <div className="text-center text-muted my-5">
              <i className="bi bi-robot fs-1"></i>
              <p className="mt-3">Ask me anything about your tailings facilities!</p>
              <p className="small">Try asking about piezometer readings, compliance status, settlement monitoring, or rainfall data.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 ${message.role === 'user' ? 'text-end' : ''}`}
              >
                <div 
                  className={`d-inline-block p-3 rounded-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-light'
                  }`}
                  style={{ 
                    maxWidth: '80%', 
                    textAlign: 'left',
                    backgroundColor: message.role === 'user' ? '#006039' : undefined 
                  }}
                >
                  <div>{message.content}</div>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-top">
                      <small className="text-muted">Sources:</small>
                      <ul className="mb-0 ps-3">
                        {message.sources.map((source, index) => (
                          <li key={index} className="small">
                            {source.title}
                            {source.date && ` (${source.date})`}
                            {source.section && `, ${source.section}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {message.visualizations && message.visualizations.length > 0 && (
                    <div className="mt-2">
                      {message.visualizations.map((viz, index) => (
                        <div key={index} className="bg-white p-2 rounded mt-1">
                          <small className="text-muted">{viz.title}</small>
                          <div className="text-center p-2 bg-light rounded">
                            <i className={`bi bi-${getVisualizationIcon(viz.type)} me-2`}></i>
                            {viz.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-1">
                    <small className="text-muted">
                      {message.timestamp.toLocaleTimeString()}
                    </small>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="mb-3">
              <div className="d-inline-block p-3 rounded-3 bg-light">
                <div className="d-flex align-items-center">
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span>Processing your query...</span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="p-3 border-top">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ask about your tailings facilities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading || !query.trim()}
                style={{ backgroundColor: '#006039', borderColor: '#006039' }}
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const QueryHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueryHistory = async () => {
      try {
        const response = await fetch('/api/query/history');
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          setError('Failed to fetch query history');
        }
      } catch (err) {
        setError('An error occurred while fetching query history');
        console.error(err);
        // Use mock data if API call fails
        setHistory([
          { id: 1, query: 'What are the current piezometer readings for North Dam?', timestamp: '2025-04-28T09:30:00Z' },
          { id: 2, query: 'Is the facility compliant with GISTM requirements?', timestamp: '2025-04-27T14:15:00Z' },
          { id: 3, query: 'Show me the settlement monitoring data for the last month', timestamp: '2025-04-25T11:20:00Z' },
          { id: 4, query: 'What was the rainfall in March 2025?', timestamp: '2025-04-22T16:45:00Z' },
          { id: 5, query: 'When is the next compliance assessment due?', timestamp: '2025-04-20T10:10:00Z' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchQueryHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (history.length === 0) {
    return <div className="alert alert-info">No query history found</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h5 className="card-title mb-0">Recent Queries</h5>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {history.map((item) => (
            <div key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-chat-left-text me-2"></i>
                  {item.query}
                </div>
                <small className="text-muted">
                  {new Date(item.timestamp).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
function getVisualizationIcon(type: string): string {
  switch (type) {
    case 'line_chart':
      return 'graph-up';
    case 'bar_chart':
      return 'bar-chart';
    case 'pie_chart':
      return 'pie-chart';
    case 'status_dashboard':
      return 'layout-text-window';
    default:
      return 'graph-up';
  }
}

// Mock response function for testing
function getMockResponse(query: string): { 
  answer: string; 
  sources: Array<{ title: string; date?: string; section?: string; }>; 
  visualizations: Array<{ type: string; title: string; }>;
} {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('piezometer') || lowerQuery.includes('water level')) {
    return {
      answer: "The piezometer readings for North Dam show stable water levels within the expected range. The most recent measurements from April 22, 2025 indicate pressures between 12.3 kPa and 18.7 kPa, which is within the normal operating parameters.",
      sources: [
        { title: "North Dam Piezometer Monitoring Report", date: "April 22, 2025" },
        { title: "Tailings Dam Safety Guidelines", section: "3.2 Pore Pressure Monitoring" }
      ],
      visualizations: [
        { type: "line_chart", title: "Piezometer Readings (Last 30 Days)" }
      ]
    };
  } else if (lowerQuery.includes('compliance') || lowerQuery.includes('gistm')) {
    return {
      answer: "The North Dam facility is currently compliant with GISTM requirements. The last compliance assessment was completed on March 15, 2025, with all 15 principal requirements met. The next scheduled assessment is due on September 15, 2025.",
      sources: [
        { title: "GISTM Compliance Assessment Report", date: "March 15, 2025" },
        { title: "Global Industry Standard on Tailings Management", section: "Requirement 7" }
      ],
      visualizations: [
        { type: "status_dashboard", title: "GISTM Compliance Status" }
      ]
    };
  } else if (lowerQuery.includes('settlement') || lowerQuery.includes('displacement')) {
    return {
      answer: "Surface displacement monitoring shows minimal movement at the North Dam crest. The maximum recorded displacement in the last quarter was 3.2mm, which is below the threshold of concern (5mm). Settlement rates have been decreasing since January 2025.",
      sources: [
        { title: "North Dam Settlement Monitoring Report", date: "Q1 2025" },
        { title: "Geotechnical Assessment", section: "Deformation Analysis" }
      ],
      visualizations: [
        { type: "line_chart", title: "Settlement Trends (Last 12 Months)" }
      ]
    };
  } else if (lowerQuery.includes('rainfall') || lowerQuery.includes('weather')) {
    return {
      answer: "The cumulative rainfall at North Dam for Q1 2025 was 342mm, which is approximately 15% above the seasonal average. The maximum 24-hour rainfall event was 78mm on February 12, 2025, which triggered Level 1 monitoring protocols as per the Operations Manual.",
      sources: [
        { title: "Environmental Monitoring Report", date: "Q1 2025" },
        { title: "Weather Station Data", section: "Precipitation Records" }
      ],
      visualizations: [
        { type: "bar_chart", title: "Monthly Rainfall Comparison" }
      ]
    };
  } else {
    return {
      answer: "I don't have specific information about that query in my knowledge base. Please try asking about piezometer readings, compliance status, settlement monitoring, or rainfall data for our tailings facilities.",
      sources: [],
      visualizations: []
    };
  }
}
