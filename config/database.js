const { Sequelize } = require('sequelize');

// initialiser Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

module.exports = sequelize;
