const mysql = require('mysql2');
const config = require('./env');

const db = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
}).promise();

module.exports = db;