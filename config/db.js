const mysql = require('mysql2');
const { config } = require('./config');

const db = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
}).promise();

db.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(error => {
    console.error('Error connection to the database: ', error.message);
  })

module.exports = db;