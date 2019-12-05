const initState = {
    forestData: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'GET_FOREST':
            return {
                ...state,
                forestData: action.forestData
            };
        case 'UPDATE_FOREST':
            const res = state.forestData.map(it => {
                if (it.id === action.TreeData.id) {
                    it.openChildren = action.TreeData.openChildren;
                }
                return it;
            });
            return {
                forestData: res
            };
        default:
            return state
    }
};
