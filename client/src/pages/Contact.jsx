import React, { useState } from 'react'

export default function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitMessage, setSubmitMessage] = useState('')

    // met à jour l'état du form à chaque fois qu'un user met quelque chose dans l'un des input du formulaire
    const handleChangeForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        try {
            // function pour envoyer une requête avec fetch dans un json
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_name: formData.name,
                    sender_email: formData.email,
                    content: formData.message,
                })
            })
            // ici pour remettre à zero le form si requête OK 
            const data = await response.json();
            if (response.ok) {
                setSubmitMessage('Votre demande a bien été envoyée')
                setFormData({ name: '', email: '', message: '' })
            } 
            else {
                setSubmitMessage('Erreur:' + data.message)
            }
        }
        catch (error) {
            setSubmitMessage('Erreur:' + error.message)
        }
    }
    return (
        <div className="contact-form-container">
            <h1>Contactez-nous</h1>
                <p>Vous avez des questions ou souhaitez obtenir un devis ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
            
            <form onSubmit={ handleSubmitForm }>
                <div className="form-group">
                    <label htmlFor="name">Votre nom :</label>
                    <input type="text" id="name" name="name" value={ formData.name } onChange={ handleChangeForm }required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Votre e-mail :</label>
                    <input type="email" id="email" name="email" value={ formData.email } onChange={ handleChangeForm } required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Votre demande :</label>
                    <textarea id="message" name="message" rows="6" value={ formData.message } onChange={ handleChangeForm } required></textarea>
                </div>
                { submitMessage }
                <button type="submit" className="submit-button">Envoyer</button>
            </form>
        </div>
    )
}
