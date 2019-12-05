import React, { Fragment, useContext, useState } from 'react';
import TreeItem from "../../TreeItem/page/TreeItem";
import "./Forest.css"
import { getTree } from "../../../../utils/getTree";

const forest = getTree();
forest.forEach(it => it.openChildren = false);
export const TreeContext = React.createContext({});
export default function Forest() {

    const context = useContext(TreeContext);
    context.forest = forest;

    const [childrenOpenCloseText, updateChildrenOpenCloseText] = useState("open");
    const [forestData, setForestData] = useState(context.forest);

    context.handlerUpdateData = (id, isOpen) => {
        forestData.forEach(it => {
            updateTreeDataById(it, id, isOpen);
        });
        let haveOpen;
        forestData.forEach(it => {
            if (it.openChildren) {
                haveOpen = true;
            }
        });
        setForestData(forestData.map(it => {
            updateTreeDataById(it, id, isOpen);
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
                ? <Fragment>
                    {
                        forestData.map(item => {
                            return <TreeContext.Provider value={context}>
                                <TreeItem
                                    key={item.id + "TreeItem"}
                                    data={item}/>
                            </TreeContext.Provider>

                        })
                    }
                </Fragment>
                : 'empty'}
        </div>
    );
}
