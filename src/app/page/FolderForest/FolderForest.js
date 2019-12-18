import React, { useState, useEffect } from 'react';
import TreeItem from "../../components/TreeItem/TreeItem";
import "./FolderForest.css"

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
const chooseFolderAndOpenParentFolder = (treeData, id) => {
    if (treeData.children.length > 0) {
        const children = treeData.children.map(childrenData => {
            return chooseFolderAndOpenParentFolder(childrenData, id);
        });
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
export const ForestContext = React.createContext();

const FolderForest = ({ defaultChooseId, defaultForest, onChoose = () => { }}) => {
    const [forest, setForest] = useState(defaultForest);
    const OpenOrCloseText = forest.some(it => it.open) ? "closeAll" : "openAll";

    useEffect(() => {
        setForest(defaultForest.map(it => {
            return chooseFolderAndOpenParentFolder(it, defaultChooseId);
        }));
    }, [defaultChooseId])

    const handleOpenOrClose = (id) => {
        setForest(forest.map(it => {
            return toggleTreeDataById(it, id);
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

    const toggleAllTree = () => {
        const allClosed = forest.all(it => !it.open);
        setForest(forest.map(treeData => {
            return toggleTree(treeData, allClosed);
        }));
    };

    const toggleTree = (treeData, isOpen) => {
        const copyTreeData = { ...treeData, open: isOpen };
        if (copyTreeData.children.length > 0) {
            const children = copyTreeData.children.map(childrenData => {
                return toggleTree(childrenData, isOpen);
            });
            return { ...copyTreeData, children: children }
        }
        return copyTreeData;
    };

    const handleChoose = (id) => {
        onChoose(id);
        setForest(forest.map(it => {
            return updateChooseById(it, id);
        }));
    };

    return (
        <ForestContext.Provider
            value={{ handleOpenOrClose, handleChoose }}>
            <div className="forest-div">
                <div className="forest-header-div">
                    <button onClick={toggleAllTree}>{OpenOrCloseText}</button>
                </div>
                <div className="forest-body">
                    {forest.map(item => {
                        return <TreeItem
                            key={item.id}
                            data={item} />
                    })}
                </div>

                {forest.length === 0 && 'empty'}
            </div>
        </ForestContext.Provider>
    );
};
export default FolderForest;
