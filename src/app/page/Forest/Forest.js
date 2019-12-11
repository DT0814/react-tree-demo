import React, { useContext } from 'react';
import TreeItem from "../../components/TreeItem/TreeItem";
import "./Forest.css"
import { SysContext } from "../../App";

const Forest = () => {
    const { forest, toggleAllTree } = useContext(SysContext);
    const OpenOrCloseText = forest.some(it => it.open) ? "closeAll" : "openAll";

    return (
        <div className="forest-div">
            <div className="forest-header-div">
                <button onClick={toggleAllTree}>{OpenOrCloseText}</button>
            </div>
            {forest.map(item => {
                return <TreeItem
                    key={item.id + "TreeItem"}
                    data={item}/>
            })}
            {forest.length === 0 && 'empty'}
        </div>
    );
};
export default Forest;
