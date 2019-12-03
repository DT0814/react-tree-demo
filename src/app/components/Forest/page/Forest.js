import React, { Component } from 'react';
import TreeItem from "../../TreeItem/page/TreeItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getForestData } from "../action/ForestActions";

class Forest extends Component {
    componentDidMount() {
        this.props.getForestData();
    }

    render() {
        const { forestData } = this.props;
        return (
            <div>
                {forestData.length !== 0 ? this.renderData(forestData) : 'empty'}
            </div>
        );
    }

    renderData(forestData) {
        return <div>
            {
                forestData.map(item => {
                    return <TreeItem key={item.id + "TreeItem"} data={item}/>
                })
            }
        </div>;
    }
}

const mapStateToProps = state => ({
    forestData: state.forest.forestData
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getForestData
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Forest);
