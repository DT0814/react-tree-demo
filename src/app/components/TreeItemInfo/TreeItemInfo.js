import React, { useContext } from 'react';
import closeFolder from '../../resource/closeFolder.png'
import openFolder from '../../resource/openFolder.png'
import closeImg from '../../resource/close.png'
import openImg from '../../resource/open.png'
import './TreeItemInfo.css'
import { ForestContext } from "../../page/FolderForest/FolderForest";

const TreeItemInfo = (props) => {
    const { showChildren, text, treeId } = props;
    const { onOpenOrClose, onChoose } = useContext(ForestContext);

    const handleClickOpenOrClose = (event) => {
        event.stopPropagation();
        onOpenOrClose(treeId);
    };

    const handleClickChoose = (e) => {
        onChoose(treeId);
    };
    return (
        <div className="tree-info-div" onClick={handleClickChoose}>
            <div className="file-img-div">
                {showChildren ? <img src={closeFolder} alt={''}/> : <img src={openFolder} alt={''}/>}
            </div>
            <span>{text}</span>
            <div className="close-or-open-div">
                {showChildren
                    ? <img onClick={handleClickOpenOrClose} src={closeImg} alt={''}/>
                    : <img onClick={handleClickOpenOrClose} src={openImg} alt={''}/>}
            </div>
        </div>
    );
};

export default TreeItemInfo;
