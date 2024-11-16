const express = require('express');
const router = express.Router();
const { addJoke } = require('../controllers/jokeController');
const { getAllJokes, getRandomJoke, getJokeById } = require('../controllers/jokeController');

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
router.get('/random', getRandomJoke);

module.exports = router;
