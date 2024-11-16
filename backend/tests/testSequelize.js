const { Sequelize, DataTypes } = require('sequelize');

// Connexion à SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Définition du modèle Joke
const Joke = sequelize.define('Joke', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  },{

  timestamps: false,
});

// Tester la connexion et ajouter une blague
async function testSequelize() {
  try {
    // Tester la connexion à la base de données
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    // Synchroniser le modèle avec la base de données
    await sequelize.sync({ alter: true }); 
    console.log('Modèle synchronisé avec la base de données.');

    // Ajouter une blague
    const newJoke = await Joke.create({ text: 'Pourquoi les développeurs détestent-ils l\'été ?', author: 'John Doe' });
    console.log('Blague ajoutée:', newJoke);

    // Récupérer toutes les blagues
    const jokes = await Joke.findAll();
    console.log('Liste des blagues:', jokes);

  } catch (error) {
    console.error('Erreur Sequelize:', error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
  }
}

// Appeler la fonction de test
testSequelize();
