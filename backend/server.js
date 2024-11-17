require('dotenv').config();
const app = require('./app'); // Importation de l'application

// Définir le port
const PORT = process.env.PORT;
if (!PORT) {
  console.error("Le port n'est pas défini !");
  process.exit(1);
}

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  } else {
    console.log(`Swagger documentation available at https://https://joke-api-backend.onrender.com/api-docs`);
  }

});
