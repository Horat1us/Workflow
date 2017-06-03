import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

const rootElement = document.getElementById('app');
if(!rootElement) {
    console.warn("Can not find #app element.");
} else ReactDOM.render(
    <Layout/>,
    rootElement
);