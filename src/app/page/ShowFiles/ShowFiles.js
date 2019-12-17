import React, { useContext, useState, useEffect, useMemo } from "react";
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { range } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";
import Forest from "../Forest/Forest";
import { getForest } from "../../../utils/ForestUtils";
import { usePromise } from "../../../utils/usePromise";

const ShowFiles = ({ moveFilesToFolder, deleteFiles, copyFilesToFolder }) => {
    const context = useContext(SysContext);
    const files = context.currentFiles.files.map((it, index) => {
        return { ...it, index };
    })
    const [chosenState, setChosenState] = useState({ chosenFileId: context.currentFiles.chosenFiles.map(it => it.id), shiftStartIndex: 0 });
    const [showModal, setShowModal] = useState(false);
    const [toFolderId, setToFolderId] = useState(-1);
    const [modalPromise, setModalPromise] = useState({ resolve: () => { }, reject: () => { } });

    const [confirmLoading, setConfirmLoading] = useState(false);
    useEffect(() => {
        setChosenState({ chosenFileId: context.currentFiles.chosenFiles.map(it => it.id), shiftStartIndex: 0 });
    }, [context.currentFiles.chosenFiles])

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
            const ids = range(chosenState.shiftStartIndex, currentClickIndex).map((it) => {
                return files[it].id;
            });
            setChosenState({
                ...chosenState,
                chosenFileId: [...ids, files[currentClickIndex].id]
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

    const handleDelete = () => {
        const { confirm } = Modal;
        confirm({
            title: 'Are you sure delete this ?',
            content: 'Operations are not recoverable',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteFiles(files.filter(it => chosenState.chosenFileId.includes(it.id)));
            },
            onCancel() {
            },
        });
    }

    const moveButAble = chosenState.chosenFileId.length > 0;
    const copyButAble = chosenState.chosenFileId.length > 0;
    const deleteButAble = chosenState.chosenFileId.length > 0;
    const defaultForest = getForest();

    const [selectFolder, resolve, reject] = usePromise(() => () => setShowModal(true), [setShowModal]);

    const handleMove = useMemo(() => async (files) => {
        const moveFiles = files.filter(it => chosenState.chosenFileId.includes(it.id));
        try {
            const toFolderId = await selectFolder();
            moveFilesToFolder(moveFiles, toFolderId);
        } catch{
        }
        setShowModal(false);
    }, [files])

    const handleCopy = useMemo(() => async (files) => {
        const copyFiles = files.filter(it => chosenState.chosenFileId.includes(it.id));
        try {
            const toFolderId = await selectFolder();
            copyFilesToFolder(copyFiles, toFolderId);
        } catch{
        }
        setShowModal(false);
    }, [files])

    return <div className="show-files-div" onClick={handleClickWhiteSpace}>
        <div className="show-files-menu">
            <button
                className={moveButAble ? "show-files-menu-move" : "show-files-menu-move-disable"}
                onClick={()=>handleMove(files)}
                disabled={!moveButAble}
            >Move</button>
            <button
                className={copyButAble ? "show-files-menu-copy" : "show-files-menu-copy-disable"}
                onClick={()=>handleCopy(files)}
                disabled={!copyButAble}
            >Copy</button>
            <button
                className={deleteButAble ? "show-files-menu-delete" : "show-files-menu-delete-disable"}
                onClick={handleDelete}
                disabled={!deleteButAble}
            >Delete</button>
        </div>
        {
            files.map(file => {
                const isChoose = chosenState.chosenFileId.includes(file.id);
                return <FileItem key={file.id} handleClick={handleClick} file={file} isChoose={isChoose} />
            })
        }
        <Modal
            title="选择移动到的文件夹"
            visible={showModal}
            onOk={() => resolve(toFolderId)}
            onCancel={reject}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <div className="move-folder">
                <Forest defaultForest={defaultForest}
                    onClickFolder={(toFolderId) => {
                        setConfirmLoading(toFolderId === context.currentId);
                        setToFolderId(toFolderId)
                    }}
                />
            </div>
        </Modal>
    </div>
};

export default ShowFiles;
