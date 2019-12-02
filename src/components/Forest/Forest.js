import React, { Component } from 'react';
import TreeItem from "../TreeItem/TreeItem";

class Forest extends Component {
    render() {
        const { data } = this.props;
        return (
            <div>
                {data.length !== 0 ? this.renderData(data) : 'empty'}
            </div>
        );
    }

    renderData(data) {
        return <div>
            {
                data.map(item => {
                    return <TreeItem key={item.id + "TreeItem"} data={item}/>
                })
            }
        </div>;
    }
}

export default Forest;
