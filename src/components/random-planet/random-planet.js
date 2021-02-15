import React, { Component } from 'react';

import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import RandomPlanetView from "./random-planet-view";
import SwapiService from "../../services/swapi-service";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false,
        errorApp: false
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
    };

    updatePlanet = () => {
        let id = Math.floor(Math.random()*20)+2;
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    componentDidCatch(error, errorInfo) {
        this.setState({errorApp: true})
    }

    render() {
        const { planet, loading, error} = this.state;
        const hasData = !(loading || error);
        const errorMassage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <RandomPlanetView planet={planet}/> : null;

        if (this.state.errorApp) {
            return <ErrorIndicator />
        }

        return (
            <div className="random-planet jumbotron rounded">
                {errorMassage}
                {spinner}
                {content}
            </div>
        );
    }
};
