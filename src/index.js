import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.querySelector('#app'),
);
