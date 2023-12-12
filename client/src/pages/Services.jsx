import React from 'react'

export default function Services() {
    return (
        <main className="services-container">
            <article className="service">
                <img src="assets/img/travauxpaysagistebis.jpg" alt="image de travaux" />
                <div className="service-content">
                    <h2>Conception Paysagère</h2>
                    <p>Nous créons des designs uniques adaptés à vos besoins et à votre environnement, transformant vos idées en réalités verdoyantes.</p>
                </div>
            </article>
            <article className="service">
                <img src="assets/img/vue-laterale-femme-tenant-pelle.jpg" alt="image d'une femme tenant une pelle" />
                <div className="service-content">
                    <h2>Aménagement Paysager</h2>
                    <p>De la sélection des plantes à la construction de jardins, nous offrons des solutions complètes pour tous vos besoins en aménagement paysager.</p>
                </div>
            </article>
            <article className="service">
                <img src="assets/img/tir-vertical-du-parc-hoetger-couvert-verdure-sous-ciel-nuageux-au-soleil-dortmund.jpg" alt="image d'un parc sous un ciel nuageux au soleil" />
                <div className="service-content">
                    <h2>Entretien d’Espaces Verts</h2>
                    <p>Nous prenons soin de vos jardins et espaces verts pour qu'ils restent beaux et sains tout au long de l'année.</p>
                </div>
            </article>
            <article className="service">
                <img src="assets/img/homme-arrose-ses-plantes-dans-son-jardin-homme-chemise-bleue.jpg" alt="image d'un homme arrosant ses plantes" />
                <div className="service-content">
                    <h2>Arrosage Automatique</h2>
                    <p>Profitez de systèmes d'arrosage automatique efficaces et économiques, conçus pour maintenir vos plantes en parfaite santé.</p>
                </div>
            </article>
        </main>
    )
}

