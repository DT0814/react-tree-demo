import React, { Component } from 'react';
import TreeItemInfo from "./TreeItemInfo/TreeItemInfo";
import './TreeItem.css'

class TreeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChildren: false
        }
    }

    updateShowChildren(showChildren) {
        this.setState(
            {
                showChildren: showChildren
            }
        )
    }

    render() {
        let children = this.props.data.children;
        let showChildren = this.state.showChildren;
        return (
            <div className="tree-item-div">
                <TreeItemInfo
                    handlerClick={this.updateShowChildren.bind(this)}
                    showChildren={showChildren}
                    text={this.props.data.name}/>
                <div hidden={!showChildren}>
                    {
                        children.map(item => <TreeItem key={item.id + "TreeItem"} data={item}/>)
                    }
                </div>
            </div>
        );
    }
}

export default TreeItem;
