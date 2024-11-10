// Description: Fichier principal de l'application Express.
const express = require('express');
const dotenv = require('dotenv');
//const { sequelize } = require('./models/joke');
const path = require('path');
const sequelize = require('./config/database');
const seedDatabase = require('./seed');
const {Joke} = require('./models/joke');



// synchroniser les modèles avec la base de données
sequelize.sync()
  .then(async () => {
    console.log('Database connected and synchronized');
    const jokeCount = await Joke.count();
    if (jokeCount === 0) {
      await seedDatabase();
    }
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation des modèles:', error);
  });

// Synchronisation avec la base de données (marque cette fonction comme async)
/*async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized');

    // Vérifie si la base est vide et lance le seed si nécessaire
    const jokeCount = await Joke.count();
    if (jokeCount === 0) {
      await seedDatabase();
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}*/
// Appel de la fonction pour synchroniser la base de données
//syncDatabase();

// Charger les variables d'environnement depuis .env
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir la landing page à la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Import des routes
const jokeRoutes = require('./routes/jokeRoutes');

// Utiliser les routes importées
app.use('/api/v1', jokeRoutes);

// Définir le port
const PORT = process.env.PORT || 3000;

console.log('Serveur démarré');
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
