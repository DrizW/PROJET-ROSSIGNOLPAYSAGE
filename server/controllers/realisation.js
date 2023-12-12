const db = require('../models/database.js')

const RealisationController = {
    // methode pour récuperer ce que j'ai envoyé en requete depuis mon dashboard 
    addRealisation: async (req, res) => {
        const { title, description, imageUrls } = req.body 
    
        try {
            const queryRealisation = 'INSERT INTO realisation (title, description) VALUES (?, ?)'
            const valuesRealisation = [title, description]
            const [resultRealisation] = await db.execute(queryRealisation, valuesRealisation)
            // ajout d'un if pour que s'il y a des urls d'image on les rajoute dans la table realisation_image
            if (resultRealisation.affectedRows && imageUrls && imageUrls.length) {
                const queryImages = 'INSERT INTO realisation_image (id_realisation, image) VALUES ?'
                const valuesImages = imageUrls.map(url => [resultRealisation.insertId, url])
                await db.query(queryImages, [valuesImages])
            }
    
            res.status(201).json({ message: 'Nouvelle réalisation ajoutée avec succès', id: resultRealisation.insertId })
        }
        catch (error) {
            console.error('Erreur: réalisation non ajouté', error)
            res.status(500).json({ message: 'Erreur réalisation non ajouté' })
        }
    },
    // méthode pour récuperer toutes les realisations avec leur images associés (de la table realisation_image)
    getAllRealisations: async (req, res) => {
        try {
            const [realisations] = await db.execute(
                'SELECT realisation.id_realisation, realisation.title, realisation.description, GROUP_CONCAT(realisation_image.image) as imageUrls FROM realisation LEFT JOIN realisation_image ON realisation.id_realisation = realisation_image.id_realisation GROUP BY realisation.id_realisation'
            )
            res.status(200).json(realisations)
        }
        catch (error) {
            console.error('Erreur lors de la récupération des réalisations:', error)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },
    // methode pour mettre à jour la table realisation avec la modif qui est faite 
    updateRealisation: async (req, res) => {
        const { id } = req.params
        const { title, description, imageUrls } = req.body

        try {
            const queryRealisation = 'UPDATE realisation SET title = ?, description = ? WHERE id_realisation = ?'
            const valuesRealisation = [title, description, id]
            await db.execute(queryRealisation, valuesRealisation)

            const deleteImagesQuery = 'DELETE FROM realisation_image WHERE id_realisation = ?'
            await db.execute(deleteImagesQuery, [id])

            if (imageUrls && imageUrls.length) {
                const queryImages = 'INSERT INTO realisation_image (id_realisation, image) VALUES ?'
                // ici transforme chaque url d'image en un tableau avec id de la realisation et url d'image
                const valuesImages = imageUrls.map(url => [id, url])
                await db.query(queryImages, [valuesImages])
            }

            res.status(200).json({ message: 'Réalisation mise à jour avec succès' })
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour de la réalisation:', error)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },
    
    // ici pour supprimer une realisation de la table correspondante
    deleteRealisation: async (req, res) => {
        const { id } = req.params

        try {
            // requete pour supprimer egalement les images liés à la realisation/projet
            const deleteImagesQuery = 'DELETE FROM realisation_image WHERE id_realisation = ?'
            await db.execute(deleteImagesQuery, [id])
            // requête pour supprimer la realisation 
            const query = 'DELETE FROM realisation WHERE id_realisation = ?'
            await db.execute(query, [id])
            res.status(200).json({ message: 'Réalisation supprimée avec succès' })
        }
        catch (error) {
            console.error('Erreur lors de la suppression de la réalisation:', error)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },
    // ici pour supprimer une image en particulier lié à une realisation
    deleteRealisationImage: async (req, res) => {
        const { id_realisation } = req.params
        const { imageUrl } = req.body

        try {
            // requete pour supprimer l'image spécifié
            const sql = 'DELETE FROM realisation_image WHERE id_realisation = ? AND image = ?'
            const [result] = await db.execute(sql, [id_realisation, imageUrl])
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Image non trouvée' })
            }

            res.status(200).json({ message: 'Image supprimée avec succès' })
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image:', error)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    }
}

module.exports = RealisationController
