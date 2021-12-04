const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                auth: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;