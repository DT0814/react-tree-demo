import React, { useContext, useState } from "react";
import {Modal} from 'antd';
import 'antd/dist/antd.css';
import { range } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";
import Forest from "../Forest/Forest";
import { getForest } from "../../../utils/ForestUtils";

const ShowFiles = ({moveFilesToFolder,deleteFiles,copyFiles}) => {
    const context = useContext(SysContext);
    const [chosenState, setChosenState] = useState({ chosenFileId: context.currentFiles.chosenFiles.map(it => it.id), shiftStartIndex: 0 });
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [moveMessage, setMoveMessage] = useState({moveToFolderId:-1,files:[]});

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
                return context.currentFiles.files[it].id;
            });
            setChosenState({
                ...chosenState,
                chosenFileId: [...ids,context.currentFiles.files[currentClickIndex].id]
            });
        } else {
            setChosenState({
                chosenFileId: [fileId],
                shiftStartIndex: currentClickIndex,
            });
        }
    };
    const files = context.currentFiles.files.map((it,index) => {
        return {...it,index};
    })

    const handleClickWhiteSpace = () => {
        setChosenState({ chosenFileId: [], shiftStartIndex: 0 });
    }
    const handleMove = () => {
        moveFilesToFolder(moveMessage.files,moveMessage.moveToFolderId)
    }

    const handleMoveCancel = () => {
           setShowMoveModal(false);
    }

    const handleShowMoveModal = ()=> {
        setMoveMessage({files:files.filter(it => chosenState.chosenFileId.includes(it.id)),moveToFolderId:-1})
        setShowMoveModal(true);
    }

    const handleDelete = () => {
        deleteFiles(files.filter(it => chosenState.chosenFileId.includes(it.id)));
    }

    const handleCopy = () => {
        copyFiles(files.filter(it => chosenState.chosenFileId.includes(it.id)));
    }

    return <div className="show-files-div" onClick={handleClickWhiteSpace}>

        <div className="show-files-menu">
            <button className="show-files-menu-move" onClick={handleShowMoveModal}>move</button>
            <button className="show-files-menu-copy" onClick={handleCopy}>copy</button>
            <button className="show-files-menu-delete" onClick={handleDelete}>delete</button>
        </div>
        {
            files.map(file => {
                const isChoose = chosenState.chosenFileId.includes(file.id);
                return <FileItem key={file.id} handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
        <Modal
            style={{ lineHeight: 20 }}
            title="选择移动到的文件夹"
            visible={showMoveModal}
            onOk={handleMove}
            onCancel={handleMoveCancel}
        >
            <Forest initForest = {getForest()}
                onClickFolder={(moveToFolderId)=>{setMoveMessage({...moveMessage,moveToFolderId})}}
            />
        </Modal>
    </div>
};

export default ShowFiles;
