import React from "react";

const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
];

const ItemStatusFilter = ({filter, onFilterChange = () => {}}) => {

    const button = filterButtons.map(({name, label}) => {

        const isActive = name === filter;

        let classNames = "btn";

        if (isActive) {
            classNames += ' btn-info';
        } else {
            classNames += ' btn-outline-secondary';
        }

        return (
            <button key={name}
                    type="button"
                    onClick={() => onFilterChange(name)}
                    className={classNames}>
                {label}
            </button>
        );
    });

    return (
        <div className="btn-group">
            {button}
        </div>
    )
};

export default ItemStatusFilter;