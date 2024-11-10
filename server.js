// Description: Fichier principal de l'application Express.
const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models/joke');
const path = require('path');

// synchroniser les modèles avec la base de données
sequelize.sync()
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
