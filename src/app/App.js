import React, { useState } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import ShowFiles from "./page/ShowFiles/ShowFiles";
import { getForest } from "../utils/ForestUtils";
import { getFilesByFolderId } from "../utils/FilesUtils";

export const SysContext = React.createContext({ forest: [], currentFiles: [] });

function App() {

    const [forest, setForest] = useState(getForest());
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentId, setCurrentId] = useState(-1);

    const handleOpenOrClose = (id) => {
        setForest(forest.map(it => {
            return openOrCloseTreeDataById(it, id);
        }));
    };

    const findAndReturn = (array, iterator, assert) => {
        for (const item in array) {
            const result = iterator(array[item]);
            if (assert(result, array[item])) {
                return result;
            }
        }
        return null;
    };

    const openOrCloseTreeDataById = (treeData, id) => {
        if (treeData.id === id) {
            return { ...treeData, open: !treeData.open };
        }
        const targetChild = findAndReturn(treeData.children, it => openOrCloseTreeDataById(it, id), (a, b) => (a !== b));
        if (targetChild === null) {
            return treeData;
        }
        return {
            ...treeData,
            children: treeData.children.map(child => child.id === targetChild.id ? targetChild : child),
        };
    };

    const handleChoose = (id) => {
        if (id!==currentId){
            setCurrentFiles(getFilesByFolderId(id));
            setCurrentId(id);
        }
        setForest(forest.map(it => {
            return updateChooseById(it, id);
        }));
    };

    const updateChooseById = (treeData, id) => {
        if (treeData.children.length > 0) {
            const children = treeData.children.map(childrenData => {
                return updateChooseById(childrenData, id);
            });
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

    const toggleAllTree = () => {
        const isOpen = !forest.some(it => it.open);
        setForest(forest.map(treeData => {
            return openOrCloseAll(treeData, isOpen);
        }));
    };

    const openOrCloseAll = (treeData, isOpen) => {
        const copyTreeData = { ...treeData, open: isOpen };
        if (copyTreeData.children.length > 0) {
            const children = copyTreeData.children.map(childrenData => {
                return openOrCloseAll(childrenData, isOpen);
            });
            return { ...copyTreeData, children: children }
        }
        return copyTreeData;
    };
    const chooseFile  = (indexs)=>{
        console.log(indexs);
    };
    return (
        <SysContext.Provider value={{ forest, handleOpenOrClose, toggleAllTree,  handleChoose, currentFiles,chooseFile }}>
            <div className="body-div">
                <Forest/>
                <ShowFiles/>
            </div>
        </SysContext.Provider>
    );
}

export default App
