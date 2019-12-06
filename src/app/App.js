import React, { useState } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import { getTree } from "../utils/getTree";

export const TreeContext = React.createContext({});

function App() {

    const [forest, setForest] = useState(getTree().map(it => {
        it.openChildren = false;
        return it;
    }));
    return (
        <TreeContext.Provider value={{ forest, setForest }}>
            <Forest/>
        </TreeContext.Provider>
    );
}

export default App
