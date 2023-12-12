require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const routes = require('./routes/routes.js')


const SERVER_PORT = 3001
const app = express()

// Configuration de la session
app.use(session({
    store: new FileStore({
        path: './.sessions', // Chemin du dossier pour stocker les fichiers de session
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    retries: 0,
    retryInterval: 10000,
    rolling: true,
}))

// Rendre le dossier public accessible
app.use(express.static('public'))

// Activation de l'analyse du contenu du corps de la requête
app.use(express.json()) // pour analyser application/json
app.use(express.urlencoded({ extended: true })) // pour analyser application/x-www-form-urlencoded

// Montage des routes de l'application
app.use('/', routes.router)

// Démarrage du serveur
app.listen(SERVER_PORT, () => {
    console.log('Serveur démarré sur le port ' + SERVER_PORT)
})
