const { Sequelize, DataTypes } = require('sequelize');

// Créer une instance de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Définir le modèle Joke
const Joke = sequelize.define('Joke', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// Synchroniser le modèle avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Modèle Joke synchronisé avec la base de données');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation du modèle :', error);
  });

module.exports = {Joke, sequelize};
