import React from 'react';
import closeImg from '../resource/close.png'
import openImg from '../resource/open.png'
import './TreeItemInfo.css'

const TreeItemInfo = (props) => {
    let { showChildren, text, handlerClick } = props;
    return (
        <div>
            {showChildren ? <img src={closeImg}/> : <img src={openImg}/>}

            <button onClick={() => handlerClick(!showChildren)}>{text}</button>
        </div>
    );
}

export default TreeItemInfo;
