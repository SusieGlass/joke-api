const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const seedDatabase = require('./seed');
const Joke = require('./models/joke');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const cors = require('cors');
app.use(cors({ origin: '*' }));

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

// Middleware pour logger chaque requête entrante
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware pour suivre les requêtes depuis Swagger
app.use((req, res, next) => {
  console.log(`[Swagger Test] ${req.method} ${req.url}`);
  next();
});


// Route pour servir la landing page à la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route spécifique pour `/random`
app.get('/random', async (req, res) => {
  console.log('Handling /random request');
  try {
    const joke = await Joke.findOne({ order: sequelize.random() });
    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json({ message: 'No jokes found' });
    }
  } catch (error) {
    console.error('Error handling /random:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
syncDatabase();

module.exports = app;
