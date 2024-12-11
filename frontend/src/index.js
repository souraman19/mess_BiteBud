import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './context/StateContext.jsx';
import reducer, { initialState } from './context/StateReducers.js'; // Adjust paths as necessary

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>
  </React.StrictMode>
);

