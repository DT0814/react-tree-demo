import React, { useState } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import { getTree } from "../utils/getTree";

export const TreeContext = React.createContext({ forest: [] });

function App() {

    const [forest, setForest] = useState(getTree());

    const handleUpdateData = (id, isOpen) => {
        setForest(forest.map(it => {
            return updateTreeDataById(it, id, isOpen, 1);
        }));
    };

    const updateTreeDataById = (treeData, id, isOpen) => {
        if (treeData.id === id) {
            return { ...treeData, open: isOpen };
        }
        if (treeData.children.length > 0) {
            const children = treeData.children.map(childrenTreeData => {
                return updateTreeDataById(childrenTreeData, id, isOpen);
            });

            if (children.some((it, index) => it !== treeData.children[index])) {
                return { ...treeData, children: children }
            }
        }
        return treeData;
    };

    const openCloseAllTree = () => {
        const isOpen = !forest.some(it => it.open);
        setForest(forest.map(treeData => {
            return updateTreeData(treeData, isOpen);
        }));
    };

    const updateTreeData = (treeData, isOpen) => {
        const copyTreeData = { ...treeData, open: isOpen };
        if (copyTreeData.children.length > 0) {
            const children = copyTreeData.children.map(childrenData => {
                return updateTreeData(childrenData, isOpen);
            });
            return { ...copyTreeData, children: children }
        }
        return copyTreeData;
    };

    return (
        <TreeContext.Provider value={{ forest, setForest, handlerUpdateData: handleUpdateData, openCloseAllTree }}>
            <Forest/>
        </TreeContext.Provider>
    );
}

export default App
