import React, {Component} from "react";

import './people-page.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
        error: false
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    };

    render() {
        if (this.state.error) {
            return <ErrorIndicator />
        }
        return (
        <div className="row mb2">
            <div className="col-md-6">
                <ItemList onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}/>
            </div>
            <div className="col-md-6">
                <PersonDetails personId={this.state.selectedPerson}/>
            </div>
        </div>
        )
    }
}

