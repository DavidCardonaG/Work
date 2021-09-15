import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import General from './Containers/General';
import Inicio from './Containers/Inicio'

ReactDOM.render(
  <React.StrictMode>
     <General />
  </React.StrictMode>,
  document.getElementById('root')
);
