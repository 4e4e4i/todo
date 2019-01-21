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
        items: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        filter: 'all',
        term: ''
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        // add element in array
        this.setState(({ items }) => {

            const newArr = [
                ...items,
                newItem
            ];

            return {
                items: newArr
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ items }) => {
            const idx = items.findIndex((el) => el.id === id);

            const newArray = [
                ...items.slice(0, idx),
                ...items.slice(idx + 1)
            ];

            return {
                items: newArray
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        // 1. update object
        const oldItem = arr[idx];
        const newItem = { ...oldItem,
            [propName]: !oldItem[propName]};

        // 2. construct new array
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onToggleImportant = (id) => {
        this.setState(({ items }) => {
            return {
                items: this.toggleProperty(items, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ items }) => {
            return {
                items: this.toggleProperty(items, id, 'done')
            };
        });
    };

    searchItems(items, term) {
        if(term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    }

    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }


    render() {

        const { items, filter, term } = this.state;
        const doneCount = items.filter((item) => item.done).length;
        const todoCount = items.length - doneCount;
        const visibleItems = this.filterItems(this.searchItems(items, term), filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={ this.onSearchChange }/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={ this.onFilterChange }
                    />
                </div>
                <TodoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <NewItemPanel
                    onItemAdded={ this.addItem }/>
            </div>
        );
    }
}