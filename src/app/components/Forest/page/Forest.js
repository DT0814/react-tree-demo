import React, { Fragment, useContext, useState } from 'react';
import TreeItem from "../../TreeItem/page/TreeItem";
import "./Forest.css"
import { TreeContext } from "../context/TreeContext";

export default function Forest() {
    const context = useContext(TreeContext);
    const [childrenOpenCloseText, updateChildrenOpenCloseText] = useState("open");
    const [forestData,setForestData] = useState(context.forest);

    const handlerUpdateData = (id, isOpen) => {

        forestData.forEach(it => {
            updateTreeDataById(it, id, isOpen);
        });

        let haveOpen;
        setForestData(forestData.map(it => {
            if (it.openChildren) {
                haveOpen = true;
            }
            return it;
        }));
        updateChildrenOpenCloseText(haveOpen ? "close" : "open");
    };

    const updateTreeData = (it, haveOpen) => {
        if (it.children.length > 0) {
            it.children.forEach(cit => {
                updateTreeData(cit, haveOpen);
            });
        }
        it.openChildren = !haveOpen;
    };

    const updateTreeDataById = (it, id, isOpen) => {
        if (it.id === id) {
            it.openChildren = isOpen;
            console.log(it);
            return;
        }
        if (it.children.length > 0) {
            it.children.forEach(cit => {
                updateTreeDataById(cit, id, isOpen);
            });
        }
    };
    const openCloseAllTree = () => {
        let haveOpen = false;
        forestData.forEach(it => {
            if (it.openChildren === true) {
                haveOpen = true;
            }
        });
        updateChildrenOpenCloseText(!haveOpen ? "close" : "open");
        forestData.forEach(it => {
            updateTreeData(it, haveOpen);
        });
    };

    return (
        <div className="forest-div">
            <div className="forest-header-div">
                <button onClick={openCloseAllTree.bind(this)}>{childrenOpenCloseText}</button>
            </div>

            {forestData.length !== 0
                ? <TreeContext.Provider>
                    {
                        forestData.map(item => {
                            return <TreeItem
                                key={item.id + "TreeItem"}
                                data={item}
                                handlerUpdateData={handlerUpdateData}/>
                        })
                    }
                </TreeContext.Provider>
                : 'empty'}
        </div>
    );
}
