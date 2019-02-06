const app = require('../server.js');
const testServer = require('supertest');

// Use .agent method to keep single session to reuse authorization
const server = testServer.agent('http://localhost:5000');

module.exports = server;