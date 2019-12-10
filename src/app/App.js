import React, { useState } from 'react';
import './App.css';
import Forest from "./page/Forest/Forest";
import { getTree } from "../utils/getTree";

export const TreeContext = React.createContext({ forest: [] });

function App() {

    const [forest, setForest] = useState(getTree());

    const handleUpdateData = (id) => {
        setForest(forest.map(it => {
            return updateTreeDataById(it, id);
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

    const updateTreeDataById = (treeData, id) => {
        if (treeData.id === id) {
            return { ...treeData, open: !treeData.open };
        }
        const targetChild = findAndReturn(treeData.children, it => updateTreeDataById(it, id), (a, b) => (a !== b));
        if (targetChild === null) {
            return treeData;
        }
        return {
            ...treeData,
            children: treeData.children.map(child => child.id === targetChild.id ? targetChild : child),
        };
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
        <TreeContext.Provider value={{ forest, handleUpdateData, openCloseAllTree }}>
            <Forest/>
        </TreeContext.Provider>
    );
}

export default App
