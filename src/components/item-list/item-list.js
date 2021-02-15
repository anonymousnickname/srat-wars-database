import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    };

    onError = err => {
        this.setState({
            error: true
        });
    };


    componentDidMount() {
        const { getData } = this.props;
        getData()
            .then((itemList) => {
                this.setState( {
                    itemList
                });
            })
            .catch(this.onError);
    };

    renderItems (arr) {
        return arr.map(({id, name}) => {
            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            );
        });
    };

    render() {
        const {itemList, error} = this.state;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList);

        if (error) {
            return <ErrorIndicator />
        }

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
    );
    }
}
