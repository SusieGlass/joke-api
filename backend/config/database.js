const { Sequelize } = require('sequelize');

// initialiser Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});
// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

module.exports = sequelize;
