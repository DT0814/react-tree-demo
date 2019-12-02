import React, { Component } from 'react';
import TreeItem from "../TreeItem/TreeItem";

class Tree extends Component {
    render() {
        const { data } = this.props;
        return (
            <div>
                {
                    data !== ''
                        ? data.map(item => {
                            return <TreeItem key={item.id + "TreeItem"} data={item}/>
                        })
                        : 'empty'
                }
            </div>
        );
    }
}

export default Tree;
