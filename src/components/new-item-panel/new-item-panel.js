import React, { Component } from 'react';

import './new-item-panel.css';

export default class NewItemPanel extends Component {
    render() {
        return (
            <div className="new-item-panel">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => this.props.onItemAdded('Hello World')}>
                    New task
                </button>
            </div>
        )
    };
};