//module.exports = Joke;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Joke
const Joke = sequelize.define('Joke', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Joke;
