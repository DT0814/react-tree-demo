import React, { Component } from 'react';
import './App.css';
import Forest from "../components/Forest/Forest";
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
            <Forest data={this.state.treeData}/>
        );
    }
}

export default App;
