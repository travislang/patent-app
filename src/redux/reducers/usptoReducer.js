

const usptoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USPTO_APP_DATA':
            return action.payload;
        case 'CLEAR_USPTO_APP_DATA':
            return {};
        default:
            return state;
    }
};



// uspto will be on the redux state at:
// state.uspto
export default usptoReducer;