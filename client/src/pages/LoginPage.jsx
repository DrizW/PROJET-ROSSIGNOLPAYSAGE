import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/user/userSlice'
import { useRegisterUserMutation, useLoginUserMutation } from '../features/api/apiSlice'


export default function LoginPage() {
    // États pour le formulaire de connexion
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    // États pour le formulaire d'inscription
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const dispatch = useDispatch()
    const [registerUser] = useRegisterUserMutation()
    const [loginUser, { isLoading, isError }] = useLoginUserMutation()
    const navigate = useNavigate()

    // Gestion de l'inscription
    async function handleUserRegister(e) {
        e.preventDefault();
    
        // Vérifie si les champs email ou mot de passe ne sont pas vides/ trim enleve les espaces au début et fin de la chaine
        const isInputValid = registerEmail.trim() !== '' && registerPassword.trim() !== ''
        // si isInputValid est false donc chaine vide on return rien pour ne pas effectuer la requete
        if (!isInputValid) {
            return
        }
        // ici pour faire la requete d'inscription et vider les champs une fois la soumission faite
        // et message d'erreur dans le catch si requete echoué
        try {
            const result = await registerUser({ email: registerEmail, password: registerPassword }).unwrap()
            alert(result.message)
            setRegisterEmail('')
            setRegisterPassword('')
        } 
        catch (error) {
            alert('Erreur, veuillez recommencer')
        }
    }    

    // Gestion de la connexion
    async function handleUserLogin(e) {
        e.preventDefault()
    
        // Vérifie si les champs sont remplis et qu'aucune requête n'est en cours
        if (isLoading || loginEmail.trim() === '' || loginPassword.trim() === '') {
            return
        }
        try {
            const result = await loginUser({ email: loginEmail, password: loginPassword }).unwrap()
            let userPayload
            let redirectPath
            // Si l'user est admin on prepare les infos de l'user avec isAdmin et on le rediriger vers /dashboard
            //sinon s'il n'est pas admin on le redirige vers la route "/" pour repartir sur la homepage
            if (result.isAdmin) {
                userPayload = { ...result.user, isAdmin: result.isAdmin }
                redirectPath = '/dashboard'
            } 
            else {
                userPayload = result.user
                redirectPath = '/'
            }
            //ici un Dispatch de l'action pour mettre à jour l'état de l'user dans Redux
            dispatch(setUser(userPayload))
            // ici navigate redirige l'user que l'on a mentionné dans redirectpath
            navigate(redirectPath)
        } 
        catch (error) {
            console.error('Erreur de connexion:', error)
        }
    }
    

    return (
        <main>
            <section className="loginpage-container">
                <div className="login-form">
                    <form onSubmit={ handleUserLogin }>
                        <h1>Se connecter</h1>
                        { isError && <p className="error-message">Identifiants incorrects.</p> }
                        <div className="form-group">
                            <label htmlFor="login-email">Email : </label>
                            <input required id="login-email" type="email" className="login-input" value={ loginEmail } onChange={ (e) => setLoginEmail(e.target.value) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Mot de passe : </label>
                            <input required id="login-password" type="password" className="login-input" value={ loginPassword } onChange={ (e) => setLoginPassword(e.target.value) } />
                        </div>
                        <button className="login-button">Connexion</button>
                    </form>
                </div>
                <div className="register-form">
                    <form onSubmit={ handleUserRegister }>
                        <h1>S'inscrire</h1>
                        <div className="form-group">
                            <label htmlFor="register-email">Email : </label>
                            <input required id="register-email" type="email" className="login-input" value={ registerEmail } onChange={ (e) => setRegisterEmail(e.target.value) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Mot de passe : </label>
                            <input required id="register-password" type="password" className="login-input" value={ registerPassword } onChange={ (e) => setRegisterPassword(e.target.value) } />
                        </div>
                        <button className="register-button">S'inscrire</button>
                    </form>
                </div>
            </section>
        </main>
    )
}
