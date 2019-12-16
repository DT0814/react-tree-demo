import React, { useState, useRef } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import ShowFiles from "./page/ShowFiles/ShowFiles";
import { getForest } from "../utils/ForestUtils";
import { getFilesByFolderId, moveFiles, copyFiles, deleteFiles } from "../utils/FilesUtils";

export const SysContext = React.createContext({ forest: [], currentFiles: [] });
const forest = getForest();
function App() {
    const [currentFiles, setCurrentFiles] = useState({ files: [], chosenFiles: [] });
    const [currentId, setCurrentId] = useState(-1);
    const [defaultChooseId, setDefaultChooseId] = useState(-1);
    const onHandleChoose = (id) => {
        if (id !== currentId) {
            setCurrentFiles({ files: getFilesByFolderId(id), chosenFiles: [] });
            setCurrentId(id);
        }
    }
    const moveFilesToFolder = (files, toFolderId) => {
        moveFiles(files, toFolderId, currentId);
        setCurrentFiles({ files: getFilesByFolderId(toFolderId), chosenFiles: files });
        setDefaultChooseId(toFolderId);
    }

    const onDeleteFiles = (files) => {
        deleteFiles(files, currentId);
        setCurrentFiles({ files: getFilesByFolderId(currentId), chosenFiles: [] });
    }

    const copyFilesToFolder = (files,toFolderId) => {
        const newFiles = copyFiles(files, toFolderId ,currentId);
        setCurrentFiles({ files: getFilesByFolderId(toFolderId), chosenFiles:newFiles });
        setDefaultChooseId(toFolderId);
    }
    return (
        <SysContext.Provider
            value={{ currentFiles, currentId }}>
            <div className="body-div">
                <div className="body-div-left">
                    <Forest defaultForest={forest} onHandleChoose={onHandleChoose} defaultChooseId={defaultChooseId} />
                </div>
                <div className="body-div-right">
                    <ShowFiles key={currentId}
                        moveFilesToFolder={moveFilesToFolder}
                        copyFilesToFolder={copyFilesToFolder}
                        deleteFiles={onDeleteFiles} />
                </div>
            </div>
        </SysContext.Provider>
    );
}

export default App
