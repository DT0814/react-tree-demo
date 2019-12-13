import React, { useContext, useState } from "react";
import {Modal} from 'antd';
import 'antd/dist/antd.css';
import { range } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";
import Forest from "../Forest/Forest";
import { getForest } from "../../../utils/ForestUtils";

const ShowFiles = () => {
    const context = useContext(SysContext);
    const [chosenState, setChosenState] = useState({ chosenFileId: [], shiftStartIndex: 0 });
    const [showMoveModal, setShowMoveModal] = useState(false);

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
    const handleMove = () => {
    }

    const handleMoveCancel = () => {
        setShowMoveModal(false);
    }

    const handleShowMoveModal = ()=> {
        setShowMoveModal(true);
    }

    return <div className="show-files-div" onClick={handleClickWhiteSpace}>

        <div className="show-files-menu">
            <button className="show-files-menu-move-delete" onClick={handleShowMoveModal}>move</button>
            <button className="show-files-menu-copy-delete" >copy</button>
            <button className="show-files-menu-delete">delete</button>
        </div>
        {
            context.currentFiles.map(file => {
                const isChoose = chosenState.chosenFileId.includes(file.id);
                return <FileItem key={file.id} handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
        <Modal
            title="选择移动到的文件夹"
            visible={showMoveModal}
            onOk={handleMove}
            onCancel={handleMoveCancel}
        >
            <Forest initForest = {getForest()}/>
        </Modal>
    </div>
};

export default ShowFiles;
