import React from 'react';
import closeImg from '../resource/close.png'
import openImg from '../resource/open.png'
import './TreeItemInfo.css'

const TreeItemInfo = (props) => {
    let { showChildren, text, handlerClick } = props;
    return (
        <div className="tree-info-div" onClick={() => handlerClick(!showChildren)}>
            <div className="file-img-div">
                {showChildren ? <img src={closeImg}/> : <img src={openImg}/>}
            </div>
            <span>{text}</span>
        </div>
    );
}

export default TreeItemInfo;
