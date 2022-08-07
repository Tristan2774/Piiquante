
// Import du package de cryptage bcrypt
const bcrypt = require('bcrypt');

// Import du package Token
const jwt = require('jsonwebtoken');

// Mise en place du modèle user
const User = require('../models/User');

// Enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  
    // Hachage du mot de passe via fonction asynchrone
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion des utilisateurs existants avec vérification de l'existence de l'email dans la db
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
       .then(user => {
          //  Si l'email n'existe pas, alors erreur 401 ci-dessous
        if (!user) {
               return res.status(401).json({ message: 'Utilisateur inconnu !'});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                // Si mdp saisi par l'utilisateur ne correspond pas au hash enregistré dans la db, alors erreur 401 ci-dessous   
                if (!valid) {
                       return res.status(401).json({ message: 'Mot de passe incorrect !' });
                   }
                   // Si identification de l'utilisateur est ok, alors attribution d'un token
                   res.status(200).json({
                       userId: user._id,
                       // Fonction sign de jsonwebtokken pour chiffrer un nouveau token
                       token: jwt.sign(
                        // Le token contient id utilisateur comme payload (données encodées dans le token)
                        { userId: user._id },
                        // Chaîne secrète de dvt pour cryptage du token, token expire sous 24 heures   
                        'RANDOM_TOKEN_SECRET',
                        
                           { expiresIn: '24h' }
                       )
                   });
               })
                       
                   .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

