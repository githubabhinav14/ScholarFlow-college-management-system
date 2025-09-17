import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MySectionsContextProvider } from './components/contextprovider/ContextApi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MySectionsContextProvider>
    <App />
  </MySectionsContextProvider>
);

reportWebVitals();
