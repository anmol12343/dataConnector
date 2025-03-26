const express = require('express');
const mongoose = require('mongoose');
const { Client } = require('pg');
const mysql = require('mysql2/promise');
const couchbase = require('couchbase');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// Connection Handlers
const connectDatabases = {
  async MongoDB(config) {
    try {
      console.log(config);
      await mongoose.connect(`${config.host}/${config.database}`);
      return true;
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      return false;
    }
  },

  async PostgreSQL(config) {
    const client = new Client({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database
    });

    try {
      await client.connect();
      await client.end();
      return true;
    } catch (error) {
      console.error('PostgreSQL Connection Error:', error);
      return false;
    }
  },

  async MySQL(config) {
    try {
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database
      });
      await connection.end();
      return true;
    } catch (error) {
      console.error('MySQL Connection Error:', error);
      return false;
    }
  },

  async CouchDB(config) {
    try {
      const cluster = new couchbase.Cluster(
        `couchbase://${config.host}:${config.port}`,
        {
          username: config.username,
          password: config.password
        }
      );
      const bucket = cluster.bucket(config.database);
      await bucket.ping(); // Quick connectivity check
      return true;
    } catch (error) {
      console.error('CouchDB Connection Error:', error);
      return false;
    }
  },

  async REST(config) {
    try {
      const response = await fetch(`${config.host}:${config.port}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${config.username}:${config.password}`)}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('REST API Connection Error:', error);
      return false;
    }
  }
};

// Connection Endpoint
// app.post('/api/connect', async (req, res) => {

// });
app.post('/api/connect', async(req, res) => {
        console.log("anmol");
      const { type, subType, ...connectionConfig } = req.body;

  try {
    const connectionMethod = connectDatabases[subType];
    
    if (!connectionMethod) {
      return res.status(400).json({
        success: false, 
        message: 'Unsupported Connection Type'
      });
    }

    const connectionResult = await connectionMethod(connectionConfig);

    res.json({
      success: connectionResult,
      message: connectionResult 
        ? 'Connection Established Successfully' 
        : 'Connection Failed'
    });
  } catch (error) {
    console.error('Connection Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
  });

const PORT = process.env.PORT || 5000;
app.listen(4000, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;


