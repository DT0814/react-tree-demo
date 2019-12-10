import React from 'react';
import TreeItemInfo from "../TreeItemInfo/TreeItemInfo";
import './TreeItem.css'

const TreeItem=({ data }) => {
    const children = data.children;
    const className = data.open ? "tree-children-show" : "";
    return (
        <div className="tree-item-div">
            <TreeItemInfo
                showChildren={data.open}
                text={data.name}
                treeId={data.id}
                check={data.check}
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
