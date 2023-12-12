import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <div>
                <Link to="/">
                    <img src="/assets/img/logorossignol.png" alt="Logo de l'entreprise Rossignol Paysage" />
                </Link>
            </div>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/realisations">Réalisations</Link>
                <Link to="/services">Services</Link>
                <Link to="/a-propos">À propos</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    )
}
