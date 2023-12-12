const express = require("express")
const userController = require('../controllers/user.js')
const realisationController = require('../controllers/realisation.js')
const contactController = require('../controllers/contact.js')

// Middleware pour bloquer l'accès aux pages protégées
function isAuthenticated(req, res, next) {
    if (req.session && req.session.connected) {
        return next()  // L'utilisateur est authentifié
    }
    else {
        return res.status(401).json({error: '401 Unauthorized'})  // L'utilisateur n'est pas authentifié
    }
}

const router = express.Router()

// Routes publiques de l'api
router.post('/api/contact', contactController.handleFormSubmission)
router.get('/api/realisations', realisationController.getAllRealisations)

// Routes d'authentification
router.post('/api/user/register', userController.register)
router.post('/api/user/login', userController.login)
router.get('/api/user/logout', userController.logout)

// Routes protégées
router.get('/api/user/panel', isAuthenticated)
router.get('/api/contact/requests', isAuthenticated, contactController.getAllRequests)
router.delete('/api/contact/:id', isAuthenticated, contactController.deleteRequest)

router.post('/api/realisations/add', isAuthenticated, realisationController.addRealisation)
router.put('/api/realisations/:id', isAuthenticated, realisationController.updateRealisation)
router.delete('/api/realisations/:id', isAuthenticated, realisationController.deleteRealisation)
router.delete('/api/realisations/:id_realisation/images', isAuthenticated, realisationController.deleteRealisationImage)

module.exports.router = router
