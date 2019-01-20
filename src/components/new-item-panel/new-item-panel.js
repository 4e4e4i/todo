import React, { Component } from 'react';

import './new-item-panel.css';

export default class NewItemPanel extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
      this.setState({
          label: e.target.value
      });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
    };

    render() {
        return (
            <form className="new-item-panel d-flex"
                    onSubmit={this.onSubmit}>
                <input type="text"
                        className="form-control"
                        onChange={this.onLabelChange}
                        placeholder="What needs to be done"/>
                <button
                    className="btn btn-outline-secondary">
                    New task
                </button>
            </form>
        )
    };
};