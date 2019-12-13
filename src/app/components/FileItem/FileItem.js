import React from "react";
import './FileItem.css'

const FileItem = ({ file, handleClick, isChoose }) => {

    const { icon, name, size, index } = file;
    const chooseClass = isChoose ? "file-item-div-choose" : "";
    return <div className={`file-item-div ${chooseClass}`} onClick={(event) => handleClick(event, index)}>
        <img src={icon} alt=""/>
        <span>{name}</span>
        <span>{size}</span>
    </div>
};
export default FileItem;
