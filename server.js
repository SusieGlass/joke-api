// Import des modules nécessaires
const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models/joke');



sequelize.sync() // `force: true` supprime et recrée les tables
  .then(() => {
    console.log('Modèles synchronisés avec la base de données');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation des modèles:', error);
  });

// Charger les variables d'environnement depuis .env
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Import des routes
const jokeRoutes = require('./routes/jokeRoutes');

// Définir les routes de l'API (ex. : toutes les routes pour /blagues)
app.use('/api/v1', jokeRoutes);

// Définir le port
const PORT = process.env.PORT || 3000;

console.log('Serveur démarré');
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
