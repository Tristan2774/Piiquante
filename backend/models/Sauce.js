
// Déclaration de Mongoose
const mongoose = require('mongoose');

// Création du schéma (ou modèle de données) pour la base de données "Sauces"
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },

});

// Export du modèle Mongoose
module.exports = mongoose.model('Sauce', sauceSchema);