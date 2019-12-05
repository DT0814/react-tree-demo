import React, { Fragment, useContext, useState } from 'react';
import TreeItem from "../../TreeItem/page/TreeItem";
import { StoreContext } from 'redux-react-hook';
import { getForestData, updateForestData } from "../action/ForestActions";
import { useDispatch } from 'react-redux';
import "./Forest.css"

export default function Forest() {
    const dispatch = useDispatch();
    dispatch(getForestData());

    const state = useContext(StoreContext).getState();
    const forestData = state.forest.forestData;
    let [haveChildrenOpen, setHaveChildrenOpen] = useState(false);
    const [childrenOpenCloseText, updateChildrenOpenCloseText] = useState("open");
    const updateDataEvent = () => {
        let haveOpen;
        forestData.forEach(it => {
            if (it.openChildren === true) {
                haveOpen = true;
            }
        });
        updateChildrenOpenCloseText(haveOpen ? "close" : "open");
    };

    function updateTreeData(it, haveOpen) {
        if (it.children.length > 0) {
            it.children.forEach(cit => {
                updateTreeData(cit, haveOpen);
            });
        }
        it.openChildren = !haveOpen;
        dispatch(updateForestData(it))
    }

    const openCloseAllTree = () => {
        let haveOpen = false;
        forestData.forEach(it => {
            if (it.openChildren === true) {
                haveOpen = true;
            }
        });
        setHaveChildrenOpen(!haveOpen);
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
            {forestData.length !== 0 ? renderData(forestData, haveChildrenOpen, updateDataEvent) : 'empty'}
        </div>
    );
}

const renderData = (forestData, haveChildrenOpen, updateDataEvent) => {
    return <Fragment>
        {
            forestData.map(item => {
                return <TreeItem
                    key={item.id + "TreeItem"}
                    data={item}
                    updateDataEvent={updateDataEvent}
                    initShowChildren={haveChildrenOpen}/>
            })
        }
    </Fragment>;
}
