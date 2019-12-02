import React from 'react';

const TreeItemInfo = (props) => {
    let { showChildren, text } = props;
    return (
        <div>
            <span>
                {showChildren ? '➖' : '➕'}
            </span>

            <button onClick={() => props.handlerClick(!showChildren)}>{text}</button>
        </div>
    );
}

export default TreeItemInfo;
