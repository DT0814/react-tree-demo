import React, { Fragment, useContext } from 'react';
import TreeItem from "../../components/TreeItem/TreeItem";
import "./Forest.css"
import { TreeContext } from "../../App";


export default function Forest() {
    const context = useContext(TreeContext);
    context.handlerUpdateData = (id, isOpen) => {
        const newForest = context.forest.map(it => {
            return updateTreeDataById(it, id, isOpen);
        });
        context.setForest([...newForest]);
    };

    const getOpenOrCloseText = () => {
        let haveOpen = false;
        context.forest.forEach(it => {
            if (it.openChildren === true) {
                haveOpen = true;
            }
        });
        return haveOpen ? "close" : "open";
    };
    const updateTreeDataById = (treeData, id, isOpen) => {
        if (treeData.id === id) {
            treeData = { ...treeData, openChildren: isOpen };
            return treeData;
        }
        if (treeData.children.length > 0) {
            const children = treeData.children.map(childrenTreeData => {
                return updateTreeDataById(childrenTreeData, id, isOpen);
            });
            return { ...treeData, children: children };
        }
        return treeData;
    };
    const openCloseAllTree = () => {
        let haveOpen = false;
        context.forest.forEach(it => {
            if (it.openChildren === true) {
                haveOpen = true;
            }
        });
        const newForest = context.forest.map(treeData => {
            return updateTreeData(treeData, haveOpen);
        });
        context.setForest(newForest);
    };
    const updateTreeData = (treeData, haveOpen) => {
        if (treeData.children.length > 0) {
            const children = treeData.children.map(childrenData => {
                return updateTreeData(childrenData, haveOpen);
            });
            treeData = { ...treeData, children: children }
        }
        return { ...treeData, openChildren: !haveOpen };
    };

    return (
        <div className="forest-div">
            <div className="forest-header-div">
                <button onClick={openCloseAllTree.bind(this)}>{getOpenOrCloseText()}</button>
            </div>

            {context.forest.length !== 0
                ? <Fragment>
                    {
                        context.forest.map(item => {
                            return <TreeItem
                                key={item.id + "TreeItem"}
                                data={item}/>
                        })
                    }
                </Fragment>
                : 'empty'}
        </div>
    );
}
