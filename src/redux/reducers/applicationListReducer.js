// Reducer responsible for providing access to all applications 
const applicationListReducer = (state = [], action) => {

    switch (action.type) {
      case 'SET_APPLICATIONS':
        return action.payload;
      case 'UNSET_APPLICATIONS':
        return [];
      default:
        return state;
    }

  };

  export default applicationListReducer;