const initialState = false;

const MobileReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'Mobile':
            state = true;
            return state;
        case 'Computer':
            state = false;
            return state;

        default:
            return state;
    }
}

export default MobileReducer;