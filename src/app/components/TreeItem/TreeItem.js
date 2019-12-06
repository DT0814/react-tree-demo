import React, { useContext } from 'react';
import TreeItemInfo from "./components/TreeItemInfo/TreeItemInfo";
import './TreeItem.css'
import { TreeContext } from "../../App";

function TreeItem({ data }) {
    const children = data.children;
    const className = data.openChildren ? "tree-children-show" : "";
    const context = useContext(TreeContext);
    return (
        <div className="tree-item-div">
            <TreeItemInfo
                handlerClick={(isOpen) => {
                    context.handlerUpdateData(data.id,isOpen);
                }}
                showChildren={data.openChildren}
                text={data.name}
                key={data.id + "TreeItemInfo"}
            />
            <div key={data.id + "div"}
                 className={`tree-children-div ${className}`}>
                {
                    children.map(item => <TreeItem
                        key={item.id + "TreeItem"}
                        data={item}/>)
                }
            </div>
        </div>
    );
}

export default TreeItem;
