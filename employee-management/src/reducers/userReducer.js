const initialState = null;

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'INIT':
            state = action.payload;
            return state;
        case 'LOGOUT':
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default userReducer;