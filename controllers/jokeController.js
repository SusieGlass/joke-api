const sequelize = require('../models/joke').sequelize;
const { Joke } = require('../models/joke');

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

// Fonction pour obtenir une blague spécifique par son id
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


/* Fonction pour obtenir une blague aléatoire
const getRandomJoke = async (req, res) => {
  console.log("Route /blagues/random appelée");
  try {
    // Compte le nombre de blagues
    const count = await Joke.count();
    console.log(`Nombre de blagues : ${count}`);

    if (count === 0) {
      console.log('Aucune blague trouvée');
      return res.status(404).json({ error: 'Aucune blague disponible' });
    }

    Choisit un index aléatoire
    const randomIndex = Math.floor(Math.random() * count);
    console.log(`Index aléatoire : ${randomIndex}`);

    // Récupère une blague avec un offset aléatoire
    const joke = await Joke.findOne({offset: randomIndex});
    console.log(`Blague récupérée : ${joke ? joke.text : 'Aucune'}`);

    if (joke) {
      console.log(`Blague trouvée : ${joke.text}`);
      res.status(200).json(joke);
    } else {
      res.status(404).json({ error: 'Blague non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague aléatoire:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague aléatoire' });
  }
};*/


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
