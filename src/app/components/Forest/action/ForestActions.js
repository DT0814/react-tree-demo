import { getTree } from "../../../../utils/getTree";

export const getForestData = () => (dispatch) => {
    dispatch({
        type: 'GET_FOREST',
        forestData: getTree()
    });
};
export const updateForestData = (TreeData) => (dispatch) => {
    dispatch({
        type: 'UPDATE_FOREST',
        TreeData: TreeData
    });
};
