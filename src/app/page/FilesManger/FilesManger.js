import React, { useContext, useState, useMemo } from "react";
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import './FilesManger.css'
import { SysContext } from "../../App";
import FilePanel from "../../components/FilePanel/FilePanel";
import FolderForest from "../FolderForest/FolderForest";
import { getForest } from "../../../utils/ForestUtils";
import { usePromise } from "../../../utils/usePromise";

const FilesManger = ({ onMoveFiles, onDeleteFiles, onCopyFiles }) => {
    const { selectedFolder, toggleTreeDataById, toggleTree, updateChooseById } = useContext(SysContext);
    const {chosenFilesId} = selectedFolder;

    const [showModal, setShowModal] = useState(false);
    const [destFolderId, setDestFolderId] = useState(-1);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleDelete = () => {
        const { confirm } = Modal;
        confirm({
            title: 'Are you sure delete this ?',
            content: 'Operations are not recoverable',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onDeleteFiles();
            },
            onCancel() {
            },
        });
    }

    const moveButAble = chosenFilesId.length > 0;
    const copyButAble = chosenFilesId.length > 0;
    const deleteButAble = chosenFilesId.length > 0;

    const [selectFolderId, resolve, reject] = usePromise(() => () => setShowModal(true), [setShowModal]);

    const handleMove = useMemo(() => async (chosenFilesId) => {
        try {
            const destFolderId = await selectFolderId();
            onMoveFiles( destFolderId);
        } catch{

        } finally {
            setShowModal(false);
        }
    }, [chosenFilesId])

    const handleCopy = useMemo(() => async (chosenFilesId) => {
        try {
            const destFolderId = await selectFolderId();
            onCopyFiles( destFolderId);
        } catch{

        } finally {
            setShowModal(false);
        }
    }, [chosenFilesId])


    const [forest, setForest] = useState(getForest());

    const handleOpenOrClose = (id) => {
        setForest(forest.map(it => toggleTreeDataById(it, id)));
    };

    const handleToggleAllTree = () => {
        const allClosed = forest.all(it => !it.open);
        setForest(forest.map(treeData => toggleTree(treeData, allClosed)));
    };

    return <div className="show-files-div" >
        <div className="show-files-menu">
            <button
                className={moveButAble ? "show-files-menu-move" : "show-files-menu-move-disable"}
                onClick={() => handleMove(chosenFilesId)}
                disabled={!moveButAble}
            >Move</button>
            <button
                className={copyButAble ? "show-files-menu-copy" : "show-files-menu-copy-disable"}
                onClick={() => handleCopy(chosenFilesId)}
                disabled={!copyButAble}
            >Copy</button>
            <button
                className={deleteButAble ? "show-files-menu-delete" : "show-files-menu-delete-disable"}
                onClick={handleDelete}
                disabled={!deleteButAble}
            >Delete</button>
        </div>
        <FilePanel />
        <Modal
            title="选择移动到的文件夹"
            visible={showModal}
            onOk={() => resolve(destFolderId)}
            onCancel={reject}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <div className="move-folder">
                <FolderForest
                    defaultForest={forest}
                    onOpenOrClose={handleOpenOrClose}
                    onToggleAllTree={handleToggleAllTree}
                    onChoose={(destFolderId) => {

                        setConfirmLoading(destFolderId === selectedFolder.id);
                        setDestFolderId(destFolderId);
                        setForest(forest.map(it => updateChooseById(it, destFolderId)));
                    }}
                />
            </div>
        </Modal>
    </div>
};

export default FilesManger;
