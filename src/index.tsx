import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import "bulma/css/bulma.css";
import App from './App';
import React from 'react';
import store from './app/store';
import axios from "axios";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);