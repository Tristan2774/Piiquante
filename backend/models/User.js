
// Déclaration de Mongoose
const mongoose = require('mongoose');

// Rajout d'un validateur d'email comme plugin au shéma
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma
const userSchema = mongoose.Schema({
    // Ajout de "unique: true" pour que les utilisateurs ne puissent pas s'enregistrer plusieurs fois avec le même email
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true }
});

// Validateur appliqué au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// Export du schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);