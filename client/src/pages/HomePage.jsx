import React from 'react';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const images = [
        'assets/img/feuilles-multicolores.jpg',
        'assets/img/beau-panorama-du-parc-ville-verte-aube.jpg',
        'assets/img/escalier-dans-magnifique-parc.jpg',
    ]

    return (
        <main className="home-page">
            <section className="slider-container" style={{ backgroundImage: `url(${images[0]})` }}>
                <Slider images={ images } />
                <div className="services-box-container">
                    <div className="services-box">
                        <h3>ROSSIGNOL PAYSAGE</h3>
                        <p>Transformez votre espace extérieur en un havre de paix personnalisé...</p>
                        <div className="buttons-container">
                            <Link to="/a-propos" className="button-aboutpage">En savoir plus</Link>
                            <Link to="/contact" className="button-contactpage">Nous contacter</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
