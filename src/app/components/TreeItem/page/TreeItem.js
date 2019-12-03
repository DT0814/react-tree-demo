import React, { useState } from 'react';
import TreeItemInfo from "../components/TreeItemInfo/TreeItemInfo";
import './TreeItem.css'

function TreeItem({ data }) {
    let children = data.children;
    const [showChildren, setShowChildren] = useState(false);

    return (
        <div className="tree-item-div">
            <TreeItemInfo
                handlerClick={setShowChildren}
                showChildren={showChildren}
                text={data.name}/>
            <div hidden={!showChildren}>
                {
                    children.map(item => <TreeItem key={item.id + "TreeItem"} data={item}/>)
                }
            </div>
        </div>
    );
}

export default TreeItem;
