const sequelize = require('../models/joke').sequelize;
const Joke = require('../models/joke');

// Fonction pour ajouter une blague
const addJoke = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Le texte de la blague est requis' });
    }
    const newJoke = await Joke.create({ text });
    res.status(201).json(newJoke);
  } catch (error) {
    console.error('Erreur lors de l’ajout de la blague:', error);
    res.status(500).json({ error: 'Erreur lors de l’ajout de la blague' });
  }
};

// Fonction pour obtenir toutes les blagues
const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json(jokes);
  } catch (error) {
    console.error('Erreur lors de la récupération des blagues:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues' });
  }
};

// Fonction pour obtenir une blague par son id
const getJokeById = async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (!joke) {
      return res.status(404).json({ error: 'Blague non trouvée' });
    }
    res.status(200).json(joke);
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague' });
  }
};

// Fonction pour obtenir une blague aléatoire
const getRandomJoke = async (req, res) => {
  try {
    const joke = await Joke.findOne({
    order: sequelize.literal('RANDOM()'),
    });
    if (joke) {
      res.status(200).json(joke);
    } else {
      res.status(404).json({ error: 'Blague non trouvée' });
    }

  } catch (error) {
    console.error('Erreur lors de la récupération de la blague aléatoire:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague aléatoire' });
  }
};

module.exports = { addJoke, getAllJokes, getJokeById, getRandomJoke };
