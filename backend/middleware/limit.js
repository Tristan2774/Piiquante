
// Mise en place d'un limitateur de tentatives de connexion
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 6,
    message: "Votre compte a généré trop de tentatives de connexion ! Ce compte est bloqué pour 5 minutes"
})

module.exports = { limiter }