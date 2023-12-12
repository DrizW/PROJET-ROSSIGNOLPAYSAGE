import React, { useState } from 'react'

const SliderProject = (props) => {

    const images = props.images
    const [index, setIndex] = useState(0)

    // Fonction pour verifier si l'image actuel est la dernière de l'index alors on revient au debut
    // et sinon j'incremente de 1 pour passer a l'image suivante
    const nextImg = () => {
        if (index === images.length - 1) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }
    // Fonction pour verifier si l'image actuel est la premiere de l'index alors on revient sur la derniere image
    // et sinon je décremente de 1 pour revenir a l'image précédente
    const previousImg = () => {
        if (index === 0) {
            setIndex(images.length - 1)
        }
        else {
            setIndex(index - 1)
        }
    }

    return (
        <div className="slider-realisations">
            <button onClick={previousImg} className="slider-btn left-btn">{"<"}</button>
            <img src={ images[index] } alt="Images de projets" className="images-realisations" />
            <button onClick={nextImg} className="slider-btn right-btn">{">"}</button>
        </div>
    )
}

export default SliderProject
