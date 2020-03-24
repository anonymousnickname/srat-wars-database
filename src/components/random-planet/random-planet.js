import React, { Component } from 'react';

import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import RandomPlanetView from "./random-planet-view";
import SwapiService from "../../services/swapi-service";

export default class RandomPlanet extends Component {

    swapi = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false});
    };

    onError = err => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updatePlanet = () => {
        let id = Math.floor(Math.random()*20)+2;
        id = 20 ? id : 13;
        this.swapi.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    };

    constructor() {
        super();
        this.updatePlanet();
    };

    render() {

        const { planet, loading, error} = this.state;
        const hasData = !(loading || error);

        const errorMassage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <RandomPlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMassage}
                {spinner}
                {content}
            </div>
        );
    }
};
