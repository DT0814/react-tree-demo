import React, { useState, useRef } from 'react';
import './App.css';
import FolderForest from "./page/FolderForest/FolderForest";
import FilesManger from "./page/FilesManger/FilesManger";
import { getForest } from "../utils/ForestUtils";
import { getFilesByFolderId, filesMove, filesCopy, filesDelete } from "../utils/FilesUtils";

export const SysContext = React.createContext({ forest: [], currentFiles: [] });
const forest = getForest();
function App() {
    const [currentFiles, setCurrentFiles] = useState({ files: [], chosenFiles: [] });
    const [currentId, setCurrentId] = useState(-1);
    const onChoose = (id) => {
        if (id !== currentId) {
            setCurrentFiles({ files: getFilesByFolderId(id), chosenFiles: [] });
            setCurrentId(id);
        }
    }
    const filesMoveToFolder = (files, destFolderId) => {
        filesMove(files, destFolderId, currentId);
        setCurrentFiles({ files: getFilesByFolderId(destFolderId), chosenFiles: files });
        setCurrentId(destFolderId);
    }

    const filesDeleteByFolderId = (files) => {
        filesDelete(files, currentId);
        setCurrentFiles({ files: getFilesByFolderId(currentId), chosenFiles: [] });
    }

    const copyFilesToFolder = (files,destFolderId) => {
        const newFiles = filesCopy(files, destFolderId ,currentId);
        setCurrentFiles({ files: getFilesByFolderId(destFolderId), chosenFiles:newFiles });
        setCurrentId(destFolderId);
    }
    return (
        <SysContext.Provider
            value={{ currentFiles, currentId }}>
            <div className="body-div">
                <div className="body-div-left">
                    <FolderForest defaultForest={forest} onChoose={onChoose} defaultChooseId={currentId} />
                </div>
                <div className="body-div-right">
                    <FilesManger
                        filesMove={filesMoveToFolder}
                        filesCopy={copyFilesToFolder}
                        filesDelete={filesDeleteByFolderId} />
                </div>
            </div>
        </SysContext.Provider>
    );
}

export default App
