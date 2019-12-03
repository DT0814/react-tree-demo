import React, { useContext } from 'react';
import TreeItem from "../../TreeItem/page/TreeItem";
import { StoreContext } from 'redux-react-hook';
import { getForestData } from "../action/ForestActions";
import { useDispatch } from 'react-redux';

export default function Forest() {
    useDispatch()(getForestData());
    const forestData = useContext(StoreContext).getState().forest.forestData;
    return (
        <div>
            {forestData.length !== 0 ? renderData(forestData) : 'empty'}
        </div>
    );


}

function renderData(forestData) {
    return <div>
        {
            forestData.map(item => {
                return <TreeItem key={item.id + "TreeItem"} data={item}/>
            })
        }
    </div>;
}
