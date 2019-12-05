import React, { useEffect, useState } from 'react';
import TreeItemInfo from "../components/TreeItemInfo/TreeItemInfo";
import './TreeItem.css'
import { useDispatch } from "react-redux";
import { updateForestData } from "../../Forest/action/ForestActions";

function TreeItem({ data, initShowChildren = true, updateDataEvent }) {
    let children = data.children;
    const [showChildren, setShowChildren] = useState(initShowChildren);
    let className = showChildren ? "tree-children-show" : "";
    useEffect(() => {
        setShowChildren(data.openChildren);
    }, [data.openChildren]);
    const dispatch = useDispatch();

    return (
        <div className="tree-item-div">
            <TreeItemInfo
                handlerClick={(res) => {
                    setShowChildren(res);
                    data.openChildren = res;
                    dispatch(updateForestData(data));
                    updateDataEvent();
                }}
                showChildren={showChildren}
                text={data.name}
                key={data.id + "TreeItemInfo"}
            />
            <div key={data.id + "div"}
                 className={`tree-children-div ${className}`}>
                {
                    children.map(item => <TreeItem
                        key={item.id + "TreeItem"}
                        data={item}
                        updateDataEvent={updateDataEvent}
                        initShowChildren={initShowChildren}/>)
                }
            </div>
        </div>
    );
}

export default TreeItem;
