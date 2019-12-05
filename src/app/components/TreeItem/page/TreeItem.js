import React, { useEffect } from 'react';
import TreeItemInfo from "../components/TreeItemInfo/TreeItemInfo";
import './TreeItem.css'

function TreeItem({ data, handlerUpdateData }) {
    let children = data.children;
    let className = data.openChildren ? "tree-children-show" : "";
    return (
        <div className="tree-item-div">
            <TreeItemInfo
                handlerClick={(res) => {
                    data.openChildren = res;
                    handlerUpdateData();
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
                        data={item}
                        handlerUpdateData={handlerUpdateData}/>)
                }
            </div>
        </div>
    );
}

export default TreeItem;
