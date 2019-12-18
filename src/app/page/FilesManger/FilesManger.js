import React, { useContext, useState, useEffect, useMemo } from "react";
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { range } from 'lodash'
import './FilesManger.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";
import FilePanel from "../../components/FilePanel/FilePanel";
import FolderForest from "../FolderForest/FolderForest";
import { getForest } from "../../../utils/ForestUtils";
import { usePromise } from "../../../utils/usePromise";

const FilesManger = ({ filesMove, filesDelete, filesCopy }) => {
    const context = useContext(SysContext);
    const files = context.currentFiles.files;
    const [chosenFiles, setChosenFiles] = useState([...context.currentFiles.chosenFiles]);
    const [showModal, setShowModal] = useState(false);
    const [destFolderId, setDestFolderId] = useState(-1);
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        setChosenFiles(context.currentFiles.chosenFiles);
    }, [context.currentFiles.chosenFiles])

    const handleDelete = () => {
        const { confirm } = Modal;
        confirm({
            title: 'Are you sure delete this ?',
            content: 'Operations are not recoverable',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                filesDelete(chosenFiles);
            },
            onCancel() {
            },
        });
    }

    const moveButAble = chosenFiles.length > 0;
    const copyButAble = chosenFiles.length > 0;
    const deleteButAble = chosenFiles.length > 0;
    const defaultForest = getForest();

    const [selectFolderId, resolve, reject] = usePromise(() => () => setShowModal(true), [setShowModal]);

    const handleMove = useMemo(() => async (chosenFiles) => {
        try {
            const destFolderId = await selectFolderId();
            filesMove(chosenFiles, destFolderId);
        } catch{

        } finally {
            setShowModal(false);
        }
    }, [chosenFiles])

    const handleCopy = useMemo(() => async (chosenFiles) => {
        try {
            const destFolderId = await selectFolderId();
            filesCopy(chosenFiles, destFolderId);
        } catch{

        } finally {
            setShowModal(false);
        }
    }, [chosenFiles])

    const onChooseFile = (chosenFilesId) => setChosenFiles(files.filter(it=>chosenFilesId.includes(it.id)));

    return <div className="show-files-div">
        <div className="show-files-menu">
            <button
                className={moveButAble ? "show-files-menu-move" : "show-files-menu-move-disable"}
                onClick={() => handleMove(chosenFiles)}
                disabled={!moveButAble}
            >Move</button>
            <button
                className={copyButAble ? "show-files-menu-copy" : "show-files-menu-copy-disable"}
                onClick={() => handleCopy(chosenFiles)}
                disabled={!copyButAble}
            >Copy</button>
            <button
                className={deleteButAble ? "show-files-menu-delete" : "show-files-menu-delete-disable"}
                onClick={handleDelete}
                disabled={!deleteButAble}
            >Delete</button>
        </div>
        <FilePanel
            defaultFiles={files}
            onChooseFile={onChooseFile}
            defaultChosenFiles={chosenFiles} />
        <Modal
            title="选择移动到的文件夹"
            visible={showModal}
            onOk={() => resolve(destFolderId)}
            onCancel={reject}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <div className="move-folder">
                <FolderForest defaultForest={defaultForest}
                    onChoose={(destFolderId) => {
                        setConfirmLoading(destFolderId === context.currentId);
                        setDestFolderId(destFolderId)
                    }}
                />
            </div>
        </Modal>
    </div>
};

export default FilesManger;
