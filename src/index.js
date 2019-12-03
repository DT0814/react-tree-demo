import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import store from "./store";
import { StoreContext } from 'redux-react-hook';

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App/>
    </StoreContext.Provider>,
    document.getElementById('root'));
