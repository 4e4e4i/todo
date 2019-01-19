import React, { Component } from 'react';

import "./app.css";

// Components
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel'
import ItemStatusFilter from "../item-status-filter";
import NewItemPanel from "../new-item-panel";

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            {label: 'Drink Coffee', important: false, id: 1},
            {label: 'Make Awesome App', important: true, id: 2},
            {label: 'Have a lunch', important: false, id: 3}
        ]
    };

    addItem = (text) => {
        // generate id
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        // add element in array
        this.setState(({ todoData }) => {

            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList
                    todos={this.state.todoData}
                    onDeleted={ this.deleteItem }/>
                <NewItemPanel
                    onItemAdded={ this.addItem }/>
            </div>
        );
    }
}