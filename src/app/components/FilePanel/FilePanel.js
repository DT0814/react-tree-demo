import React, { useState, useEffect } from "react";
import { range } from 'lodash'
import './FilePanel.css'
import FileItem from "../FileItem/FileItem";

const FilePanel = ({ defaultFiles, onChooseFile = () => { }, defaultChosenFiles }) => {
    const [chosenState, setChosenState] = useState({ chosenFileId: [], shiftStartIndex: 0 });
    const [files, setFiles] = useState(defaultFiles.map((it, index) => { return { ...it, index } }));

    useEffect(() => {
        setFiles(defaultFiles.map((it, index) => { return { ...it, index } }));
        setChosenState({ chosenFileId: defaultChosenFiles.map(it => it.id), shiftStartIndex: 0 });

    }, [defaultFiles]);
    useEffect(() => {
        setChosenState({ chosenFileId: defaultChosenFiles.map(it => it.id), ...chosenState });
    }, [defaultChosenFiles]);

    const handleClick = (event, currentClickIndex, fileId) => {
        event.stopPropagation();
        if (event.metaKey) {
            if (chosenState.chosenFileId.includes(fileId)) {
                onChooseFile(chosenState.chosenFileId.filter((it) => it !== fileId));
                setChosenState({
                    chosenFileId: chosenState.chosenFileId.filter((it) => it !== fileId),
                    shiftStartIndex: currentClickIndex
                });
            } else {
                onChooseFile([...chosenState.chosenFileId, fileId]);
                setChosenState({
                    chosenFileId: [...chosenState.chosenFileId, fileId],
                    shiftStartIndex: currentClickIndex
                });
            }
        } else if (event.shiftKey) {
            const ids = range(chosenState.shiftStartIndex, currentClickIndex).map((it) => {
                return files[it].id;
            });
            onChooseFile([...ids, files[currentClickIndex].id]);
            setChosenState({
                ...chosenState,
                chosenFileId: [...ids, files[currentClickIndex].id]
            });
        } else {
            onChooseFile([fileId]);
            setChosenState({
                chosenFileId: [fileId],
                shiftStartIndex: currentClickIndex,
            });
        }
    };

    const handleClickWhiteSpace = () => {
        setChosenState({ chosenFileId: [], shiftStartIndex: 0 });
    }

    return <div className="file-panel" onClick={handleClickWhiteSpace}>
        {
            files.map(file => {
                const isChoose = chosenState.chosenFileId.includes(file.id);
                return <FileItem key={file.id} handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
    </div>
};

export default FilePanel;
