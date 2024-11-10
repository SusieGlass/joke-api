const { Sequelize } = require('sequelize');

// initialiser Sequelize avec une instance de SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

module.exports = sequelize;
