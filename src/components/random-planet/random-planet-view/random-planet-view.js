import React, {Fragment} from "react";

import './random-planet-view.css'

const RandomPlanetView = ({planet}) => {
    const { id, name, population, rotationPeriod, diameter} = planet;
    return (
        <Fragment>
            <img className="planet-image"
                 src= {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="random-planet" />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population:</span>
                        <span className="list-group-item__info">{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period:</span>
                        <span className="list-group-item__info">{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter:</span>
                        <span className="list-group-item__info">{diameter}</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    )};

export default RandomPlanetView;
