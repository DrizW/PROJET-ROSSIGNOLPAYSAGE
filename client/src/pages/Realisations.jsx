import React from 'react'
import { useGetProjectsQuery } from '../features/api/apiSlice'
import SliderProject from '../components/SliderProject'

export default function Realisations() {
    const { data: projects, isLoading } = useGetProjectsQuery()

    if (isLoading) {
        return <p>Chargement des réalisations...</p>
    }
    
    if (!projects || projects.length === 0) {
        return <p>Aucune réalisation trouvée.</p>
    } 

    return (
        <main className="realisations-container">
            <h1>Nos projets réalisés</h1>
            <section className="projects-grid">
                { projects.map(project => (
                    <article key={ project.id_realisation } className="project">
                        <h3>{ project.title }</h3>
                            <p>{ project.description }</p>
                            { project.imageUrls && <SliderProject images={ project.imageUrls.split(',') } /> }
                    </article>
                ))}
            </section>
        </main>
    )
}

