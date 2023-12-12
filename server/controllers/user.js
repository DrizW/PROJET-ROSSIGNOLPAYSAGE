const db = require('../models/database.js')
const bcrypt = require('bcrypt')

// function pour enregistrer un nouvel user 
async function register(req, res) {
    const { email, password } = req.body

    // Vérifie si l'email est déjà utilisé
    const [existingUser] = await db.query(` SELECT * FROM \`user\` WHERE email = ? `, [email])
    if (existingUser.length > 0) {
        return res.status(409).json({ message: 'L\'email est déjà utilisé.' })
    }

    //ici pour Hasher le mot de passe
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    //et ici créer un nouvel user
    await db.query(` INSERT INTO \`user\` (email, password, admin) VALUES (?, ?, FALSE) `, [email, hashedPassword])
    res.status(201).json({ message: 'Compte créé avec succès.' })
}

// pour se connecter 
async function login(req, res) {
    const { email, password } = req.body

    // Récupére l'utilisateur par son email
    const [users] = await db.query(` SELECT * FROM \`user\` WHERE email = ? `, [email])
    if (users.length === 0) {
        return res.status(401).json({ message: 'Identifiants incorrects.' })
    }
    // variable pour comparé le mot de passe fourni avec le hash enregistré dans la BDD
    const match = await bcrypt.compare(password, users[0].password)
    // on verifie si le mot de passe est bon
    if (match) {
        // si le mot de passe est OK on indique qu'il est connecté
        req.session.connected = true
        req.session.user = users[0]
        // ici on indique si l'utilisateur est un administrateur ou non
        return res.json({
            success: true, 
            user: {...users[0], password: undefined},
            isAdmin: users[0].admin
        })
    }
    return res.status(401).json({ message: 'Identifiants incorrects.' })
}

// function pour deconnecter un user
async function logout(req, res) {
    
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Impossible de terminer la session.' })
        }
        return res.json({ message: 'Session terminée.' })
    })
}

module.exports = { login, logout, register }
