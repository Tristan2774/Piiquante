// Import de multer
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
  // Création d'un objet de configuration pour multer
  const storage = multer.diskStorage({
    
    // Cette fct indique à multer d'enregistrer sous /images
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    
    // Cette fct indique à multer d'utiliser le nom d'origine 
    filename: (req, file, callback) => {
      
        // Remplacement des espaces par des _
        const name = file.originalname.split(' ').join('_');
        
        
      // Constante dictionnaire de type MIME (pour résoudre l'extension de fichier approprié)
        const extension = MIME_TYPES[file.mimetype];
      
      // Ajout d'un timestamp Date.nom() comme nom de fichier
      callback(null, name + Date.now() + '.' + extension);
      
    }
  });
   // Export de multer pour gestion unique des téléchargements d'images
  module.exports = multer({storage: storage}).single('image');



