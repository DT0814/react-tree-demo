import React, { useState, useContext } from "react";
import { range } from 'lodash'
import './FilePanel.css'
import FileItem from "../FileItem/FileItem";
import { SysContext } from "../../App";

const FilePanel = () => {
    const { selectedFolder, onChooseFile} = useContext(SysContext);
    const {chosenFilesId } = selectedFolder;
    const files = selectedFolder.files.map((it,index) => {return {...it,index}})
    const [shiftStartIndex, setShiftStartIndex] = useState(0);

    const handleClick = (event, currentClickIndex, fileId) => {
        event.stopPropagation();
        if (event.metaKey) {
            if (chosenFilesId.includes(fileId)) {
                onChooseFile(chosenFilesId.filter((it) => it !== fileId));
                setShiftStartIndex(currentClickIndex);
            } else {
                onChooseFile([...chosenFilesId, fileId]);
                setShiftStartIndex(currentClickIndex);
            }
        } else if (event.shiftKey) {
            const ids = range(shiftStartIndex, currentClickIndex).map((it) => {
                return files[it].id;
            });
            onChooseFile([...ids, files[currentClickIndex].id]);
            setShiftStartIndex(currentClickIndex);
        } else {
            onChooseFile([fileId]);
            setShiftStartIndex(currentClickIndex);
        }
    };

    const handleClickWhiteSpace = () => {
        onChooseFile([]);
        setShiftStartIndex(0);
    }

    return <div className="file-panel" onClick={handleClickWhiteSpace}>
        {
            files.map(file => {
                const isChoose = chosenFilesId.includes(file.id);
                return <FileItem key={file.id} handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
    </div>
};

export default FilePanel;
