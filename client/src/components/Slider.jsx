import React, { useState, useEffect } from 'react'

const Slider = (props) => {

    const images = props.images
    const interval = props.interval || 6000
    const [index, setIndex] = useState(0)

    // Fonction pour verifier si l'image actuel est la dernière alors on return 0
    // et sinon ça incremente de 1 pour passer a l'image suivante
    const NextImg = () => {
        setIndex(prevIndex => {
            if (prevIndex === images.length - 1) {
                return 0 
            } 
            else {
                return prevIndex + 1 
            }
        })
    }
    
    // ici un useEffect pour changer d'image à interval de 6s et je clear pour nettoyer les eventuelles problemes 
    useEffect(() => {
        const slideInterval = setInterval(NextImg, interval)
        return () => clearInterval(slideInterval)},
        [index, interval]
    )

    return (
        <div className="slider-container">
            <img src={ images[index] } className="slider-image" alt="diaporama d'images de présentation" />
        </div>
    )
}

export default Slider
