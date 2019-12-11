import React, { Fragment } from 'react';
import TreeItemInfo from "../TreeItemInfo/TreeItemInfo";
import './TreeItem.css'

const TreeItem = ({ data }) => {
    const children = data.children;
    const className = data.open ? "tree-children-show" : "";
    const treeItemChoose = data.choose ? "tree-item-div-choose" : "";

    return (
        <Fragment>
            <div className={`tree-item-div ${treeItemChoose}`}>
                <TreeItemInfo
                    showChildren={data.open}
                    text={data.name}
                    treeId={data.id}
                    choose={data.choose}
                    key={data.id + "TreeItemInfo"}
                />
            </div>
            <div key={data.id + "div"}
                 className={`tree-children-div ${className}`}>
                {
                    children.map(item => <TreeItem
                        key={item.id + "TreeItem"}
                        data={item}/>)
                }
            </div>
        </Fragment>

    );
};

export default TreeItem;
