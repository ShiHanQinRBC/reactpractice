//This is like the entry point to react

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
   {/* below is App.js */}
    <App />  
  </React.StrictMode>,
  document.getElementById('root') //This grabs the div from the html file and inserts the App component
);
