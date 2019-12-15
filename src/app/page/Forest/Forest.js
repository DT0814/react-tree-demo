import React, { useContext, useState } from 'react';
import TreeItem from "../../components/TreeItem/TreeItem";
import "./Forest.css"
import { SysContext } from "../../App";

export const ForestContext = React.createContext();

const Forest = ({ initForest, onHandleChoose= ()=>{}, onClickFolder= ()=>{} }) => {
    const [forest, setForest] = useState(initForest);

    const OpenOrCloseText = forest.some(it => it.open) ? "closeAll" : "openAll";

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

    const handleChoose = (id) => {
        onHandleChoose(id);
        onClickFolder(id);
        setForest(forest.map(it => {
            return updateChooseById(it, id);
        }));
    };

    return (
        <ForestContext.Provider
            value={{ handleOpenOrClose, handleChoose  }}>
            <div className="forest-div">
                <div className="forest-header-div">
                    <button onClick={toggleAllTree}>{OpenOrCloseText}</button>
                </div>
                {forest.map(item => {
                    return <TreeItem
                        key={item.id + "TreeItem"}
                        data={item} />
                })}
                {forest.length === 0 && 'empty'}
            </div>
        </ForestContext.Provider>
    );
};
export default Forest;
