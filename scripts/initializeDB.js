const { sequelize } = require('../config/sequelize');
const { Users } = require('../models/UserModel');
const { SocialLinks } = require('../models/socialLinksModel');
require('dotenv').config();

async function initializeDatabase() {
  await sequelize.sync(); 

  const enviroment = process.env.NODE_ENV;
  if (enviroment !== 'production') return;

  const countUsers = await Users.count();
  if (countUsers === 0 ) {
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
  }

  const countSocialLinks = await SocialLinks.count();
  if (countSocialLinks === 0 ) {
    await SocialLinks.bulkCreate([
      {
        email: 'Alice Johnson',
        phone: 'Alice Johnson',
        facebook: 'Alice Johnson',
        intagram: 'Alice Johnson',
        whatsapp: 'Alice Johnson',
      }
    ]);

    console.log('Default users added to the database.');
  }
}

module.exports = initializeDatabase
