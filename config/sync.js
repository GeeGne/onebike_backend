const sequelize = require('./sequelize'); // Adjust the path as necessary

async function syncDatabase() {
  try {
    // Synchronizes the models with the database
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables (use with caution)
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

// syncDatabase();
