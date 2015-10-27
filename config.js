var dotenv = require('dotenv').load();

var config = {
  server: process.env.APP_URL || process.env.APP_DOMAIN || 'localhost'
};

module.exports = config;
