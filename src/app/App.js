import React, { useState } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import ShowFiles from "./page/ShowFiles/ShowFiles";
import { getForest } from "../utils/ForestUtils";
import { getFilesByFolderId } from "../utils/FilesUtils";

export const SysContext = React.createContext({ forest: [], currentFiles: [] });

function App() {
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentId, setCurrentId] = useState(-1);
    const onHandleChoose = (id) => {
        if (id !== currentId) {
            setCurrentFiles(getFilesByFolderId(id));
            setCurrentId(id);
        }
    }
    return (
        <SysContext.Provider
            value={{ currentFiles }}>
            <div className="body-div">
                <Forest initForest={getForest()} onHandleChoose={onHandleChoose} />
                <ShowFiles key={currentId} />
            </div>
        </SysContext.Provider>
    );
}

export default App
