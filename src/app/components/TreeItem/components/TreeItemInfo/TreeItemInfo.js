import React from 'react';

const TreeItemInfo = (props) => {
    let { showChildren, text, handlerClick } = props;
    return (
        <div>
            <span>
                {showChildren ? '➖' : '➕'}
            </span>

            <button onClick={() => handlerClick(!showChildren)}>{text}</button>
        </div>
    );
}

export default TreeItemInfo;
