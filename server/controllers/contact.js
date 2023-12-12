const db = require('../models/database.js')

const ContactController = {
    // function pour gérer la soumission du formulaire de contact
    handleFormSubmission: async (req, res) => {
        console.log("Données reçues:", req.body)
        // ici jextrait les données du formulaire de la requête qui arrive  
        const { sender_name, sender_email, content } = req.body

        // Validation des données reçues ou message d'erreur si données manquantes
        if (!sender_name || !sender_email || !content) {
            return res.status(400).json({ message: "Données incomplètes" })
        }

        // Enregistrement dans la base de données via requête SQL dans la table contact
        try {
            const query = 'INSERT INTO contact (sender_name, sender_email, content) VALUES (?, ?, ?)'
            await db.execute(query, [sender_name, sender_email, content])

            res.json({ message: "Demande de contact enregistrée avec succès." })
        }
        catch (error) {
            console.error(`Erreur lors de l'enregistrement de la demande de contact:`, error)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },
    
    // une methode pour récuperer toutes les demandes de contact  de la base de données
    getAllRequests: async (req, res) => {
        try {
            const [requests] = await db.query('SELECT * FROM contact')
            res.json(requests)
        }
        catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },
    // methode pour gérer la suppression d'une demande de contact
    deleteRequest: async (req, res) => {
        try {
            const { id } = req.params 
            await db.query('DELETE FROM contact WHERE id_contact = ?', [id])
            res.json({ message: 'Demande supprimée avec succès.' })
        }
        catch (error) {
            console.error('Erreur lors de la suppression de la demande:', error)
            res.status(500).send('Erreur lors de la suppression de la demande.')
        }
    }
}

module.exports = ContactController
