import React, { Component } from 'react';
import './App.css';
import Tree from "../components/Tree/Tree";
import { getTree } from "../utils/getTree";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: []
        }
    }

    componentDidMount() {
        this.setState({
            treeData: getTree()
        })
    }

    render() {
        return (
            <Tree data={this.state.treeData}/>
        );
    }
}

export default App;
