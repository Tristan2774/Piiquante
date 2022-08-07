// Déclaration du module express
const express = require('express');

// Création d'un routeur avec méthode express
const router = express.Router();

// Import du middleware auth pour exécution avant les gestionnaires de routes
const auth = require('../middleware/auth');

// Import du middleware multer avant le middleware d'authentification
const multer = require('../middleware/multer-config');

// Mise en place du contrôleur stuff
const sauceCtrl = require('../controllers/sauce');

// Routes disponibles dans l'application (via le nom des fonctions on sait ce qu'elles font)

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrNot);

// Export du routeur
module.exports = router;
