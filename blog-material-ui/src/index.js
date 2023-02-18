import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "/node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import AuthContextProvider from './context/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />

    </AuthContextProvider>
 
  </React.StrictMode>
);


