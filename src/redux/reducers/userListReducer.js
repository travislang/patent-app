

const userListReducer = (action) => {
    switch(action.type){
        case 'SET_USERS':
            return {... state, userList: action.payload}
        default:
            return state;
    }
}

export default userListReducer;