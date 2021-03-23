import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


ReactDOM.render(
  <BrowserRouter><React.StrictMode>
    <App />
  </React.StrictMode></BrowserRouter>,
  document.getElementById('root')
);

