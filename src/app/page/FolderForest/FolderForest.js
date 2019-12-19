import React, { useState, useEffect } from 'react';
import TreeItem from "../../components/TreeItem/TreeItem";
import "./FolderForest.css"

export const ForestContext = React.createContext();

const FolderForest = ({ defaultForest, onChoose = () => { }, onOpenOrClose, toggleAllTree }) => {
    const [forest, setForest] = useState(defaultForest);
    const OpenOrCloseText = forest.some(it => it.open) ? "closeAll" : "openAll";

    useEffect(() => {
        setForest(defaultForest);
    }, [defaultForest])

    return (
        <ForestContext.Provider
            value={{ onOpenOrClose, onChoose }}>
            <div className="forest-div">
                <div className="forest-header-div">
                    <button onClick={toggleAllTree}>{OpenOrCloseText}</button>
                </div>
                <div className="forest-body">
                    {forest.map(item => {
                        return <TreeItem
                            key={item.id}
                            data={item} />
                    })}
                </div>

                {forest.length === 0 && 'empty'}
            </div>
        </ForestContext.Provider>
    );
};
export default FolderForest;
