/* Description: Fichier principal de l'application Express.
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const seedDatabase = require('./seed');
const Joke = require('./models/joke');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const cors = require('cors'); // Importer cors

// Initialisation de l'application Express
const app = express();

// Initialisation de cors
app.use(cors());

// Charger les variables d'environnement depuis .env
dotenv.config();

// Configuration de Swagger UI avec ton fichier JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


// Fonction asynchrone pour synchroniser la base de données et lancer le seed si nécessaire
async function syncDatabase() {
  try {
    // Synchroniser la base de données
    await sequelize.sync();
    console.log('Database connected and synchronized');

    // Vérifier le nombre de blagues dans la base de données
    const jokeCount = await Joke.count();
    console.log(`Nombre de blagues dans la base : ${jokeCount}`);

    // Si la table est vide, exécuter le seed
    if (jokeCount === 0) {
      console.log('Base de données vide, insertion des blagues de seed...');
      await seedDatabase();  // Insérer les blagues de seed
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Appel de la fonction pour synchroniser la base de données
syncDatabase();*/

const app = require('./app'); // Importation de l'application

// Définir le port
const PORT = process.env.PORT || 3000;

console.log('Serveur démarré');
// Démarrer le serveur
if (require.main === module) {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
}
