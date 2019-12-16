import React, { useState } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import ShowFiles from "./page/ShowFiles/ShowFiles";
import { getForest } from "../utils/ForestUtils";
import { getFilesByFolderId,moveFiles,copyFiles,deleteFiles } from "../utils/FilesUtils";

export const SysContext = React.createContext({ forest: [], currentFiles: [] });

function App() {
    const [currentFiles, setCurrentFiles] = useState({files:[],chosenFiles:[]});
    const [currentId, setCurrentId] = useState(-1);
    const onHandleChoose = (id) => {
        if (id !== currentId) {
            setCurrentFiles({files:getFilesByFolderId(id),chosenFiles:[]});
            setCurrentId(id);
        }
    }
    const moveFilesToFolder = (files,toFolderId) => {
        moveFiles(files,toFolderId,currentId);
        setCurrentFiles({files:getFilesByFolderId(toFolderId),chosenFiles:files});
        setCurrentId(toFolderId);
    }

    const onDeleteFiles = (files) => {
        deleteFiles(files,currentId);
        setCurrentFiles({files:getFilesByFolderId(currentId),chosenFiles:[]});
        setCurrentId(currentId);
    }

    const onCopyFiles = (files) => {
        copyFiles(files,currentId);
        setCurrentFiles({files:getFilesByFolderId(currentId),chosenFiles:[]});
        setCurrentId(currentId);
    }
    return (
        <SysContext.Provider
            value={{ currentFiles }}>
            <div className="body-div">
                <Forest initForest={getForest()} onHandleChoose={onHandleChoose} />
                <ShowFiles key={currentId}
                    moveFilesToFolder={moveFilesToFolder}
                    copyFiles={onCopyFiles}
                    deleteFiles={onDeleteFiles} />
            </div>
        </SysContext.Provider>
    );
}

export default App
