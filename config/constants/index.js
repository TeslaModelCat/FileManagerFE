require('../env');
const jwt = require('./jwt');
const paths = require('./paths');

module.exports = {
  env: process.env.NODE_ENV,
  baseUrl: process.env.REACT_APP_BASE_URL,
  paths,
  jwt,
};
