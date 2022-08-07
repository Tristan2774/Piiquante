// Import de jsonwebtoken
const jwt = require('jsonwebtoken');

// Export d'une fonction pour être le middleware
module.exports = (req, res, next) => {
   try {
    // Récupération du token avec le header qui va être splité (division de la chaîne de caractères en 1 tableau autour de l'espace qui se trouve entre "bearer" et le token)
    const token = req.headers.authorization.split(' ')[1];
    
    // Décodage du token avec la méthode verify de jwt   
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    
    
    // Récupération du user id   
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !'
  } else {
      next()
  }
} catch (error) {
  res.status(401).json({ error: error | 'Requête non authentifiée !' })
}
   };