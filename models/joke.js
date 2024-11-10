const { Sequelize, DataTypes } = require('sequelize');

// Si tu n'as pas encore de fichier index.js, tu dois initialiser Sequelize ici
const sequelize = new Sequelize({
  dialect: 'sqlite',  // ou 'mysql', 'postgres' selon ta base de données
  storage: './database.sqlite'  // Chemin de ton fichier SQLite
});

// Définir ton modèle
const Joke = sequelize.define('Joke', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,  // Le texte de la blague ne peut pas être nul
  },
}, {
  // Options
  timestamps: false,  // Désactiver les timestamps si tu ne les utilises pas
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
