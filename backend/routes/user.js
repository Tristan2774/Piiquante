
// Mise en place de express pour créer un routeur
const express = require('express');

// Création du routeur avec la fonction de express
const router = express.Router();

// Mise en place d'un contrôleur de limitation du nombre de connexions
const max = require("../middleware/limit");


// Contrôleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// Création de 2 routes POST
router.post('/signup', userCtrl.signup);
router.post('/login', max.limiter, userCtrl.login);


// Export du routeur
module.exports = router;