// Reducer responsible for providing access to all applications 
const applicationsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_APPLICATIONS':
        return action.payload;
      default:
        return state;
    }
  };

  export default applicationsReducer;
  