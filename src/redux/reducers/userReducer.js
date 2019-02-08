const userReducer = (state = {user:{}, userList:[]}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {... state, user: action.payload};
    case 'UNSET_USER':
      return {};
    case 'SET_USERS':
      return {... state, userList: action.payload}
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
