import { getTree } from "../../../../utils/getTree";

export const getForestData = () => (dispatch) => {
    dispatch({
        type: 'GET_FOREST',
        forestData: getTree()
    });
};
