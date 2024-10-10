const { Sequelize, DataTypes } = require('sequelize');
const config = require('./env');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then (() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the databse:', err);
  });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes
}