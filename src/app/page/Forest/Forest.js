import React, { Fragment, useContext } from 'react';
import TreeItem from "../../components/TreeItem/TreeItem";
import "./Forest.css"
import { TreeContext } from "../../App";


export default function Forest() {
    const { forest, openCloseAllTree } = useContext(TreeContext);
    const OpenOrCloseText = forest.some(it => it.open) ? "close" : "open";

    return (
        <div className="forest-div">
            <div className="forest-header-div">
                <button onClick={openCloseAllTree}>{OpenOrCloseText}</button>
            </div>
            {forest.map(item => {
                return <TreeItem
                    key={item.id + "TreeItem"}
                    data={item}/>
            })}
            {forest.length === 0 && 'empty'}
        </div>
    );
}
