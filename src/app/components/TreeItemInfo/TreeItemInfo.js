import React, { useContext } from 'react';
import closeFolder from '../../resource/closeFolder.png'
import openFolder from '../../resource/openFolder.png'
import closeImg from '../../resource/close.png'
import openImg from '../../resource/open.png'
import './TreeItemInfo.css'
import { TreeContext } from "../../App";

const TreeItemInfo = (props) => {
    const { showChildren, text, treeId, check } = props;
    const { handleOpenOrClose, handleCheck } = useContext(TreeContext);
    const treeItemChecked = check ? "tree-item-div-check" : "";

    const handleClickOpenOrClose = (e) => {
        e.stopPropagation();
        handleOpenOrClose(treeId);
    };

    const handleClickCheck = (e) => {
        handleCheck(treeId);
    };
    return (
        <div className={`tree-info-div ${treeItemChecked}`} onClick={handleClickCheck}>
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
