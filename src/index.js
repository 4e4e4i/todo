import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";

const items = JSON.parse(localStorage.getItem('items'));

ReactDOM.render(<App items={items}/>,
    document.getElementById('root'));
