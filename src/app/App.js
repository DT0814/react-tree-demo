import React, { useState } from 'react';
import './App.css';
import FolderForest from "./page/FolderForest/FolderForest";
import FilesManger from "./page/FilesManger/FilesManger";
import { getForest } from "../utils/ForestUtils";
import { getFilesByFolderId, moveFiles, copyFiles, deleteFiles } from "../utils/FilesUtils";

export const SysContext = React.createContext();

const findTreeNodeById = (forest, id) => {
    if (forest.length > 0) {
        for (const childIndex in forest) {
            if(forest[childIndex].id === id){
                return forest[childIndex];
            }
            const res = findTreeNodeById(forest[childIndex].children, id)
            if(null != res){
                 return res;
            }
        }
    }
    return null;
};

const updateChooseById = (treeData, id) => {
    if (treeData.children.length > 0) {
        const children = treeData.children.map(childrenData => updateChooseById(childrenData, id));

        if (children.some((it, index) => it !== treeData.children[index])) {
            if (treeData.id === id) {
                return { ...treeData, choose: true, children: children };
            }
            return { ...treeData, children: children, choose: false };
        }
    }
    if (treeData.id === id) {
        return { ...(treeData), choose: true };
    } else if (treeData.choose === true) {
        return { ...(treeData), choose: false }
    } else {
        return treeData;
    }
};

const updateTreeNodeFilesById = (treeData, id, files) => {
    if (treeData.children.length > 0) {
        const children = treeData.children.map(childrenData => updateTreeNodeFilesById(childrenData, id, files));
        if (children.some((it, index) => it !== treeData.children[index])) {
            if (treeData.id === id) {
                return { ...treeData, files };
            }
            return { ...treeData, children: children };
        }
    }
    if (treeData.id === id) {
        return { ...treeData, files };
    } else {
        return treeData;
    }
};

const chooseFolderAndOpenParentFolder = (treeData, id) => {
    if (treeData.children.length > 0) {
        const children = treeData.children.map(childrenData => chooseFolderAndOpenParentFolder(childrenData, id));
        const childrenHaveOpen = children.some(it => it.choose || it.open);
        if (children.some((it, index) => it !== treeData.children[index])) {
            if (treeData.id === id) {
                return { ...treeData, choose: true, children: children, open: childrenHaveOpen };
            }
            return { ...treeData, children: children, choose: false, open: childrenHaveOpen };
        }
    }
    if (treeData.id === id) {
        return { ...treeData, choose: true };
    } else if (treeData.choose === true) {
        return { ...treeData, choose: false }
    } else {
        return treeData;
    }
}

const findAndReturn = (array, iterator, assert) => {
    for (const item in array) {
        const result = iterator(array[item]);
        if (assert(result, array[item])) {
            return result;
        }
    }
    return null;
};

const toggleTreeDataById = (treeData, id) => {
    if (treeData.id === id) {
        return { ...treeData, open: !treeData.open };
    }
    const targetChild = findAndReturn(treeData.children, it => toggleTreeDataById(it, id), (a, b) => (a !== b));
    if (targetChild === null) {
        return treeData;
    }
    return {
        ...treeData,
        children: treeData.children.map(child => child.id === targetChild.id ? targetChild : child),
    };
};

const toggleTree = (treeData, isOpen) => {
    const copyTreeData = { ...treeData, open: isOpen };
    if (copyTreeData.children.length > 0) {
        const children = copyTreeData.children.map(childrenData => toggleTree(childrenData, isOpen));
        return { ...copyTreeData, children: children }
    }
    return copyTreeData;
};

function App() {
    const [folder, setFolder] = useState({ forest: getForest(), selectedFolder: { files: [], chosenFilesId: [], id: -1 } });

    const handleChooseFile = (chosenFilesId) => {
        setFolder({ ...folder, selectedFolder: { ...folder.selectedFolder, chosenFilesId } })
    }
    const handleOpenOrClose = (id) => {
        setFolder({ ...folder, forest: folder.forest.map(it => toggleTreeDataById(it, id)) });
    };

    const handleToggleAllTree = () => {
        const allClosed = folder.forest.every(it => !it.open);
        setFolder({ ...folder, forest: folder.forest.map(treeData => toggleTree(treeData, allClosed)) });
    };

    const handleChoose = (id) => {
        if (id !== folder.selectedFolder.id) {
            const treeNode = findTreeNodeById(folder.forest, id);
            if (!treeNode.files) {
                const newForest = folder.forest.map(it => updateTreeNodeFilesById(it, id, getFilesByFolderId(id)));
                setFolder({
                    forest: newForest.map(it => updateChooseById(it, id)),
                    selectedFolder: { files: findTreeNodeById(newForest, id).files, chosenFilesId: [], id }
                });
            } else {
                setFolder({
                    forest: folder.forest.map(it => updateChooseById(it, id)),
                    selectedFolder: { files: treeNode.files, chosenFilesId: [], id }
                });
            }

        }
    }
    const handleMoveFiles = (destFolderId) => {
        const { files, chosenFilesId } = folder.selectedFolder;
        const chosenFiles = files.filter(it => chosenFilesId.includes(it.id));
        moveFiles(chosenFiles, destFolderId, folder.selectedFolder.id);
        const updateCurrentIdFiles = folder.forest.map(it => updateTreeNodeFilesById(it, folder.selectedFolder.id, getFilesByFolderId(folder.selectedFolder.id)));
        const updateDestFolderFiles = updateCurrentIdFiles.map(it => updateTreeNodeFilesById(it, destFolderId, getFilesByFolderId(destFolderId)));
        setFolder({
            forest: updateDestFolderFiles.map(it => chooseFolderAndOpenParentFolder(it, destFolderId)),
            selectedFolder: {
                files: findTreeNodeById(updateDestFolderFiles, destFolderId).files,
                chosenFilesId, id: destFolderId
            }
        });
    }

    const handleDeleteFiles = () => {
        const { files, chosenFilesId } = folder.selectedFolder;
        deleteFiles(files.filter(it => chosenFilesId.includes(it.id)), folder.selectedFolder.id);
        const newForest = folder.forest.map(it => updateTreeNodeFilesById(it, folder.selectedFolder.id, getFilesByFolderId(folder.selectedFolder.id)));
        setFolder({
            forest: newForest,
            selectedFolder:
            {
                ...folder.selectedFolder,
                files: findTreeNodeById(newForest, folder.selectedFolder.id).files,
                chosenFilesId: []
            }
        });
    }

    const handleCopyFiles = (destFolderId) => {
        const { files, chosenFilesId } = folder.selectedFolder;
        const newFiles = copyFiles(files.filter(it => chosenFilesId.includes(it.id)), destFolderId, folder.selectedFolder.id);
        const newForest = folder.forest.map(it => updateTreeNodeFilesById(it, destFolderId, getFilesByFolderId(destFolderId)));
        setFolder({
            forest: newForest.map(it => chooseFolderAndOpenParentFolder(it, destFolderId)),
            selectedFolder: {
                files: findTreeNodeById(newForest, destFolderId).files,
                chosenFilesId: newFiles.map(it => it.id),
                id: destFolderId
            }
        });
    }

    return (
        <SysContext.Provider
            value={{ selectedFolder: folder.selectedFolder, toggleTreeDataById, toggleTree, updateChooseById, onChooseFile: handleChooseFile }}>
            <div className="body-div">
                <div className="body-div-left">
                    <FolderForest
                        forest={folder.forest}
                        onChoose={handleChoose}
                        onOpenOrClose={handleOpenOrClose}
                        onToggleAllTree={handleToggleAllTree}
                    />
                </div>
                <div className="body-div-right">
                    <FilesManger
                        onMoveFiles={handleMoveFiles}
                        onCopyFiles={handleCopyFiles}
                        onDeleteFiles={handleDeleteFiles} />
                </div>
            </div>
        </SysContext.Provider>
    );
}

export default App
