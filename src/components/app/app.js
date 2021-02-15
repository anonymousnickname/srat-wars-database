import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import Title from "../title";
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        click: false,
        error: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet,
                click: !state.click,
            }
        });
    };

    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    };

    onErrorAppHeader = () => {
        this.setState({error: true})
    }

    render() {
        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : <Title />;
        const buttonValue = this.state.showRandomPlanet ? 'Destroy Planet' : 'Random Planet';
        const destroyColor = "red";
        const showColor = "#00bc8c";
        let color = this.state.click ? showColor : destroyColor ;

        let style = {
            'backgroundColor': color
        };

        if (this.state.error) {
            return (
                <div className="absolute">
                <ErrorIndicator />
                </div>)
        };

        return (
            <div className="stardb-app">
                <Header errorAppHeader={this.onErrorAppHeader}/>
                { planet }
                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    style={style}
                    onClick={this.toggleRandomPlanet}>
                    {buttonValue}
                </button>

                <PeoplePage />

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}
                        getData={this.swapiService.getAllPlanets}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}
                                  getData={this.swapiService.getAllStarships}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        );
    }
}
