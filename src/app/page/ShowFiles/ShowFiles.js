import React, { useContext, useState } from "react";
import { range } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";

const ShowFiles = () => {
    const context = useContext(SysContext);
    const [chosenState, setChosenState] = useState({ chosenFileId: [], shiftStartIndex: 0 });
    const handleClick = (event, currentClickIndex, fileId) => {
        event.stopPropagation();
        if (event.metaKey) {
            if (chosenState.chosenFileId.includes(fileId)) {
                setChosenState({
                    chosenFileId: chosenState.chosenFileId.filter((it) => it !== fileId),
                    shiftStartIndex: currentClickIndex
                });
            } else {
                setChosenState({
                    chosenFileId: [...chosenState.chosenFileId, fileId],
                    shiftStartIndex: currentClickIndex
                });
            }
        } else if (event.shiftKey) {
            const ids = range(chosenState.shiftStartIndex, currentClickIndex).map((it)=>{
                return context.currentFiles[it].id;
            });
            setChosenState({
                ...chosenState,
                chosenFileId: [...ids,context.currentFiles[currentClickIndex].id]
            });
        } else {
            setChosenState({
                chosenFileId: [fileId],
                shiftStartIndex: currentClickIndex,
            });
        }
    };

    const handleClickWhiteSpace = () => {
        setChosenState({ chosenFileId: [], shiftStartIndex: 0 });
    }

    return <div className="show-files-div" onClick={handleClickWhiteSpace}>
        {
            context.currentFiles.map(file => {
                const isChoose = chosenState.chosenFileId.includes(file.id);
                return <FileItem handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
    </div>
};

export default ShowFiles;
