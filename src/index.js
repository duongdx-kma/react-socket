import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RouterComponent from "./Route";
import { BrowserRouter } from 'react-router-dom';
import SocketProvider from "./context/socket";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App />
        <RouterComponent/>
      </SocketProvider>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
