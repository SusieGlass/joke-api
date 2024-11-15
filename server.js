require('dotenv').config();
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
