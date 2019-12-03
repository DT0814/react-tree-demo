import React from 'react';
import './App.css';
import Forest from "./components/Forest/page/Forest";
import { Provider } from "react-redux";
import store from '../store';

function App() {
    return (
        <Provider store={store}>
            <Forest/>
        </Provider>
    );
}

export default App
