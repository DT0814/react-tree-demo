import React, { Component } from 'react';

class TreeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChildren: false
        }
    }

    handlerShowClick() {
        this.setState(
            {
                showChildren: !this.state.showChildren
            }
        )
    }

    render() {
        let show = this.state.showChildren && this.props.data.children !== undefined;
        return (
            <div>
                <button onClick={this.handlerShowClick.bind(this)}>{this.props.data.name}</button>
                {
                    show ?
                        this.props.data.children.map(item => {
                                return <TreeItem key={item.id + "TreeItem"} data={item}/>
                            }
                        )
                        : ''
                }

            </div>
        );
    }
}

export default TreeItem;
