import React, { Component } from 'react';

class TreeItem extends Component {
    render() {
        return (
            <div>
                {this.props.data.name}
            </div>
        );
    }
}

export default TreeItem;
