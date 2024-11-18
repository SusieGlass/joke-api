# Joke API (Back-End)

## Description
Une API versionnée pour gérer des blagues. Elle permet :

L'ajout de blagues dans une base de données SQLite.
La consultation : toutes les blagues, une blague spécifique (via son ID), ou une blague aléatoire.

## Lien de l'API déployée
[Accéder à l'API sur Render](https://joke-api-backend.onrender.com)

## Documentation Swagger
[Accéder à Swagger](https://joke-api-backend.onrender.com/api-docs)

## Technologies utilisées
- Node.js
- Express
- Sequelize
- SQLite
- Swagger pour la documentation
- Déploiement via Render

## Cahier des charges
Bienvenue chez Carambar & Co
Vous êtes en charge de mettre en ligne une mini application web de blagues en utilisant vos connaissances et compétences.

Nous souhaitons :

Une landing page qui reflète fidèlement notre marque. Cette page comporte un bouton qui, à chaque clic, affiche une blague aléatoire.
Une API pour fournir toutes les blagues, avec une possible extension pour nos applications mobiles.
Fonctionnalités demandées
API versionnée, avec les endpoints suivants :

Ajouter une blague en base de données : /blagues (POST).
Consulter toutes les blagues : /blagues (GET).
Consulter une blague par ID : /blagues/:id (GET).
Consulter une blague aléatoire : /blagues/random (GET).
Technologies utilisées :

Node.js, Express, Sequelize (ORM), SQLite (base de données).
Structure de projet MVC.
Déploiement :

Back-end sur Render.com.
Front-end sur GitHub Pages.
Documentation Swagger pour l’API.

README GitHub avec :

Liens vers l'API, la documentation Swagger et la landing page.
Instructions pour exécuter le projet en local.

## Instructions pour exécuter en local
1. Clonez ce dépôt :
```bash
git clone https://github.com/SusieGlass/joke-api.git

2. Accédez au répertoire du projet :
```bash
cd joke-api

3. Naviguez dans le dossier backend :
```bash
cd backend

4. Installez les dépendances :
```bash
npm install

5. Créez un fichier .env à la racine avec le contenu suivant :
PORT=3000

6. Lancez le serveur :
```bash
node server js

7. Accédez à la documentation Swagger localement sur : http://localhost:3000/api-docs
