const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host:'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected via Sequelize');
  } catch (err) {
    console.error('Unable to connect to DB:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
