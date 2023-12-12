import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    useLogoutUserMutation,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useGetProjectsQuery,
    useGetContactRequestsQuery,
    useDeleteContactRequestMutation,
    useDeleteProjectImageMutation,
} from '../features/api/apiSlice'
import { unsetUser } from '../features/user/userSlice'

export default function Dashboard() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editProjectId, setEditProjectId] = useState(null)
    const [message, setMessage] = useState('')
    const [imageUrls, setImageUrls] = useState([''])

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutUser] = useLogoutUserMutation()
    const [addProject] = useAddProjectMutation()
    const [updateProject] = useUpdateProjectMutation()
    const [deleteProject] = useDeleteProjectMutation()
    const [deleteContactRequest] = useDeleteContactRequestMutation()
    const [deleteProjectImage] = useDeleteProjectImageMutation()

    const { data: projects, isLoading: isLoadingProjects } = useGetProjectsQuery()
    const { data: contactRequests, isLoading: isLoadingContactRequests } = useGetContactRequestsQuery()
   
    // ici je redirige l'user s'il n'est pas connecté
    useEffect(() => {
        if (!user) {
            navigate('/connexion')
        }
    }, [user, navigate])

    /* PARTIE AJOUT DE REALISATIONS/PROJECT */

    // ici une fonction pour deconnecter l'user avec un dispatch lorsqu'il clique sur deconnexion
    const handleLogout = async () => {
        await logoutUser().unwrap()
        dispatch(unsetUser())
        navigate('/connexion')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // function qui gère la soumission de l'ajout de projet et pour imagesurls filtre si pas d'url dans la case
        const projectData = {
            title,
            description,
            imageUrls: imageUrls.filter(url => url !== '')
        }
    
        try {
            // met à jour le projet existant en recuperant son id
            if (editProjectId) {
                await updateProject({ id: editProjectId, ...projectData }).unwrap()
                setMessage('Projet mis à jour avec succès.')
            } 
            // créer un nouveau projet si pas d'id trouvé
            else {
                await addProject(projectData).unwrap()
                setMessage('Nouveau projet ajouté avec succès.')
            }
        } 
        catch (error) {
            setMessage(`Erreur lors de la mise à jour du projet`)
            console.error(`Erreur lors de la mise à jour du projet`, error)
        }
        // vide les champs apres soumission du formulaire
        setTitle('')
        setDescription('')
        setImageUrls([''])
    }

    // remplit le tableau de bord avec les champs du projet existant pour modification
    const handleEdit = (project) => {
        setEditProjectId(project.id_realisation)
        setTitle(project.title)
        setDescription(project.description)
        
        // je vérifie si c'est un tableau pour éviter les erreurs et si oui elle met à jour l'état sinon elle remet a zero en tableau vide
        if (Array.isArray(project.imageUrls)) {
            setImageUrls(project.imageUrls)
        } 
        else {
            setImageUrls([''])
        }
    }
    // pour supprimer project un project tout simplement
    const handleDelete = async (projectId) => {
        try {
            await deleteProject(projectId).unwrap()
            setMessage('Projet bien supprimé')
        } 
        catch (error) {
            setMessage('Pas supprimé')
        }
    }
    // ajout d'un window confirm pour valider la suppression
    const handleDeleteConfirm = (projectId) => {
        if (window.confirm('Confirmez vous la suppression de ce projet ?')) {
            handleDelete(projectId)
        }
    }

    /* PARTIE AJOUT D'IMAGE VIA URL */

    // je declare une variable pour faire une copie de mon tableau imageUrls
    // je cible le nouveau tableau avec la valeur entré par l'user et je met à jour l'état avec setimages le nouveau tableau
    const handleImageUrlChange = (e, index) => {
        const newImageUrls = [...imageUrls]
        newImageUrls[index] = e.target.value
        setImageUrls(newImageUrls)
    }
    // function pour ajouter un champ vide pour que l'user ajoute une url d'image en +
    const addImageUrl = () => {
        setImageUrls([...imageUrls, ''])
    }
    //on appelle l'id_realisation du projet + imageUrl du projet auquel il appartient
    const handleDeleteImage = async (id_realisation, imageUrl) => {
        try {
            await deleteProjectImage({ id_realisation, imageUrl }).unwrap()
            setMessage('Image bien supprimée')
        } 
        catch (error) {
            setMessage('erreur: image non supprimé.')
        }
    }

    /* PARTIE QUI AFFICHE LES REALISATIONS/PROJECTS */
    
    const renderProjects = () => {
        // si isloadingprojects est true on peut return le message qui indique que le chargement des realisations est en cours
        if (isLoadingProjects) {
            return <p>Chargement des realisations</p>
        }
        // si vide ou n'existe pas alors return aucun projet
        if (!projects || projects.length === 0) {
            return <p>Aucun projet</p>
        }
        // je map projects pour itérer sur chaque projet du tableau projects 
        return projects.map(project => (
            <article key={ project.id_realisation } className="project-item">
                <h3>{ project.title }</h3>
                <p>{ project.description }</p>
                { project.imageUrls && project.imageUrls.split(',').map((url, index) => (
                    <div key={index} className="image-container">
                        <img src={url} alt={`Une image du projet pour la page réalisations`} />
                        <button className="delete-image-button" onClick={ () => handleDeleteImage(project.id_realisation, url) }>x</button>
                    </div>
                )) }
                    <div className="button-container">
                        <button className="edit-button" onClick={ () => handleEdit(project) }>Modifier</button>
                        <button className="delete-button" onClick={ () => handleDeleteConfirm(project.id_realisation) }>Supprimer</button>
                    </div>
            </article>
        ))
    }
    
    /* PARTIE DEMANDE DE CONTACT */ 
    // partie pour supprimer la demande de contact par son id
    const handleDeleteRequest = async (id) => {
        try {
            await deleteContactRequest(id).unwrap()
        } 
        catch (error) {
            console.error('erreur de suppression', error)
        }
    }
    // affiche la liste de toutes les demandes de contact
    const renderContactRequests = () => {
        if (isLoadingContactRequests) {
            return <p>chargement des demande de contacts</p>
        } 
        if (!contactRequests || contactRequests.length === 0) {
            return <p>demande de contact non trouvée</p>
        }
        // met l'heure & date au format français
        return contactRequests.map((request, index) => {
            const dateSent = new Date(request.date_sent).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })

            return (
                <div key={index} className="contact-request">
                    <p><span>Nom : </span>{ request.sender_name }</p>
                    <p><span>Email : </span>{ request.sender_email }</p>
                    <p><span>Message : </span>{ request.content }</p>
                    <p><span>Date : </span>{ dateSent }</p>
                    <button onClick={ () => handleDeleteRequest(request.id_contact) }>Supprimer</button>
                </div>
            )
        })
    }

    return (
        <main className="main-dashboard">
            <section className="dashboard-container">
                <h1>Tableau de bord des réalisations</h1>
                <form onSubmit={ handleSubmit } className="dashboard-form">
                    <div>
                        <label htmlFor="title">titre du projet:</label>
                        <input id="title" type="text" className="dashboard-input" value={ title } onChange={ (e) => setTitle(e.target.value) } />
                    </div>
                    <div>
                        <label htmlFor="description">description du projet:</label>
                        <textarea id="description" className="dashboard-textarea" value={ description } onChange={ (e) => setDescription(e.target.value) } />
                    </div>
                    <div>
                        <label>ajouter ici les urls des images:</label>
                        {imageUrls.map((url, index) => (
                            <div key={index}>
                                <input type="text" className="dashboard-input" value={url} onChange={(e) => handleImageUrlChange(e, index)} />
                                { index === imageUrls.length - 1 && (<button type="button" onClick={ addImageUrl }>+</button>) }
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="dashboard-submit">
                        { editProjectId ? 'Mettre à jour' : 'Ajouter le Projet' }
                    </button>
                </form>
                { message && <p className="dashboard-message">{message}</p> }
                <button onClick={ handleLogout } className="logout-button">Déconnexion</button>
            </section>
            <section className="projects-list-container">
                <div className="projects-list">
                    { renderProjects() }
                </div>
            </section>

            <section className="contact-requests">
                <h3>Demandes de Contact</h3>
                { renderContactRequests() }
            </section>
        </main>
    )
}
