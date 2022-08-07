// Mise en place de dotenv
require("dotenv").config();

// Import de express
const express = require('express');


// Mise en place du module helmet pour la sécurisation des entêtes http
const helmet = require('helmet');

// Mise en place d'un bodyparser afin d'exploiter les données http POST
const bodyParser = require('body-parser');

// Déclaration de Mongoose
const mongoose = require('mongoose');



// Accéder au path du serveur 
const path = require('path');


// Mise en place des variables d'environnement pour connexion à la db
const MongoDbUser = process.env.DB_USER;
const MongoDbPasswordUser = process.env.DB_PASS;
const MongoDbHost = process.env.DB_HOST;
const MongoDbName = process.env.DB_NAME;

// Import des routeurs de sauces
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Création d'une constante app pour l'application
const app = express();


app.use(helmet());

// Import du package pour les cors
const cors = require('cors');

// Déclaration de la chaîne de connexion à la base de données Mongoose
mongoose.connect(`mongodb+srv://${MongoDbUser}:${MongoDbPasswordUser}@${MongoDbHost}.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(function () {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch(function () {
    console.log("Connexion à MongoDB échouée !");
  });

  // Méthode app.use avec fonction recevant la requête et la réponse + 1er middleware
app.use((req, res, next) => {
  
  // Mise en place des headers ou entêtes à l'objet réponse renvoyé au navigateur pour éviter les erreurs CORS (Cross Origin ressource sharing )
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  // Renvoi de la fonction précédente vers le prochain middleware
  next();
});

// Enregistrement des cors
 app.use(cors()); 
  
// Middleware intercepte toutes les requêtes ayant un content type JSON (contenant du JSON) afin de mettre à dispo ce contenu (ou corps de la requête) sur l'objet requête dans req.body
app.use(bodyParser.json());

// Route pour l'enregistrement des images
app.use('/images' , express.static(path.join(__dirname, 'images')));

// Enregistrement des routes (routes liées à l'authentification)
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Export de l'application pour y accéder depuis serveur node
  module.exports = app;