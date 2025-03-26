import React, { useState } from 'react';
import './index.css';

const DynamicConnectorBuilder = () => {
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [connectorDetails, setConnectorDetails] = useState({
    type: '',
    subType: '',
    host: '',
    port: '',
    username: '',
    password: '',
    database: ''
  });

  // Connector Types
  const CONNECTOR_TYPES = [
    { 
      type: 'database', 
      name: 'Database', 
      icon: '📊',
      options: ['MongoDB', 'PostgreSQL', 'MySQL', 'CouchDB']
    },
    { 
      type: 'api', 
      name: 'API', 
      icon: '🌐',
      options: ['REST', 'GraphQL', 'SOAP']
    }
  ];

  const handleConnectorSelect = (connector) => {
    setSelectedConnector(connector);
    setConnectorDetails({
      ...connectorDetails,
      type: connector.type,
      subType: connector.options[0]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConnectorDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(connectorDetails)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Connection Established Successfully!');
      } else {
        alert('Connection Failed: ' + result.message);
      }
    } catch (error) {
      console.error('Connection Error:', error);
      alert('Error establishing connection');
    }
  };

  return (
    <div className="dynamic-connector-container">
      <h1 className="page-title">Dynamic Connector Builder</h1>

      {/* Connector Selection */}
      <div className="connector-selection">
        {CONNECTOR_TYPES.map((connector) => (
          <div 
            key={connector.type}
            className={`connector-card ${selectedConnector?.type === connector.type ? 'selected' : ''}`}
            onClick={() => handleConnectorSelect(connector)}
          >
            <div className="connector-icon">{connector.icon}</div>
            <div className="connector-name">{connector.name} Connector</div>
          </div>
        ))}
      </div>

      {/* Connector Details Form */}
      {selectedConnector && (
        <div className="connector-details-form">
          <h2>{selectedConnector.name} Connector Details</h2>
          
          <div className="form-grid">
            {/* Subtype Selector */}
            <div className="form-group">
              <label>Connector Subtype</label>
              <select 
                name="subType"
                value={connectorDetails.subType}
                onChange={handleInputChange}
                className="form-control"
              >
                {selectedConnector.options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Common Fields */}
            <div className="form-group">
              <label>Host</label>
              <input 
                name="host"
                placeholder="Host"
                value={connectorDetails.host}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Port</label>
              <input 
                name="port"
                placeholder="Port"
                type="number"
                value={connectorDetails.port}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input 
                name="username"
                placeholder="Username"
                value={connectorDetails.username}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                name="password"
                type="password"
                placeholder="Password"
                value={connectorDetails.password}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            {/* Conditional Database Field */}
            {selectedConnector.type === 'database' && (
              <div className="form-group">
                <label>Database Name</label>
                <input 
                  name="database"
                  placeholder="Database Name"
                  value={connectorDetails.database}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit}
            className="submit-button"
          >
            Establish Connection
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicConnectorBuilder;