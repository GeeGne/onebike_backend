const dotenv = require('dotenv');
dotenv.config();

const config = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'mysql',
  port: process.env.PORT || 3000,
}

module.exports = config;