const { sequelize } = require('../config/sequelize');
const Users = require('../models/Users');
require('dotenv').config();

async function initializeDatabase() {
  await sequelize.sync(); // Make sure all models are synced with the DB

  // Check if users already exist to avoid duplicates
  const enviroment = process.env.NODE_ENV;
  const count = await Users.count();
  if (count === 0 && enviroment === 'production') {
    await Users.bulkCreate([
      {
        full_name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password_hash: '$2b$10$hFWBlqfKWP5YDU/wPEuF2O2Vn2/RvmQ19HLp3hXeX/VRl3C6MovRW',
        phone: '111111111',
        address_details: '789 Street Name',
        second_address: '101 Another Street',
        notes: 'VIP customer',
        role: 'user',
        city: 'Los Angeles'
      },
      {
        full_name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password_hash: '$2b$10$hFWBlqfKWP5YDU/wPEuF2O2Vn2/RvmQ19HLp3hXeX/VRl3C6MovRW',
        phone: '222222222',
        address_details: '234 Street Name',
        second_address: '567 Another Street',
        notes: 'Regular customer',
        role: 'admin',
        city: 'San Francisco'
      }
    ]);
    console.log('Default users added to the database.');
  } else {
    console.log('Users already exist in the database.');
  }
}

initializeDatabase().catch(console.error);
