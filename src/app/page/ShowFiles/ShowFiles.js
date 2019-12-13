import React, { useContext, useEffect, useState } from "react";
import { range } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";

const ShowFiles = () => {
    const context = useContext(SysContext);
    const [chooseState, setChooseState] = useState({ indexArray: [], shiftStartIndex: 0 });

    const handleClick = (event, currentClickIndex) => {
        event.stopPropagation();
        if (event.metaKey) {
            if (chooseState.indexArray.includes(currentClickIndex)) {
                setChooseState({
                    indexArray: chooseState.indexArray.filter((it) => it !== currentClickIndex),
                    shiftStartIndex: currentClickIndex
                });
            } else {
                setChooseState({
                    indexArray: [...chooseState.indexArray, currentClickIndex],
                    shiftStartIndex: currentClickIndex
                });
            }
        } else if (event.shiftKey) {
            setChooseState({
                ...chooseState,
                indexArray: [...range(chooseState.shiftStartIndex, currentClickIndex),currentClickIndex]
            });
        } else {
            setChooseState({
                indexArray: [currentClickIndex],
                shiftStartIndex: currentClickIndex,
            });
        }
    };

    const handleClickWhiteSpace = () => {
        setChooseState({ indexArray: [], shiftStartIndex: 0 });
    }

    return <div className="show-files-div" onClick={handleClickWhiteSpace}>
        {
            context.currentFiles.map(file => {
                const isChoose = chooseState.indexArray.includes(file.index);
                return <FileItem handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
    </div>
};

export default ShowFiles;
