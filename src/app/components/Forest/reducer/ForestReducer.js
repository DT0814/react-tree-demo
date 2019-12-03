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
        default:
            return state
    }
};
