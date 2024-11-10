


const express = require('express');
const router = express.Router();
const { addJoke } = require('../controllers/jokeController');  // Assure-toi que tu importes correctement la fonction addJoke
const { getAllJokes, getRandomJoke, getJokeById } = require('../controllers/jokeController');  // Si tu as ces fonctions dans ton contrôleur

// Route pour ajouter une blague
router.post('/blagues', addJoke);

router.get('/test', (req, res) => {
  console.log('Route /test appelée');
  res.send('Test réussi');
});


// Route pour obtenir toutes les blagues
router.get('/blagues', getAllJokes);

// Route pour obtenir une blague par son id
router.get('/blagues/:id', getJokeById);

// Route pour obtenir une blague aléatoire
router.get('/blagues/random', getRandomJoke);

module.exports = router;
