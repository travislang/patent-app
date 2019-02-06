// Reducer responsible for providing access to all templates
const templateReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEMPLATES':
            return action.payload;
        case 'UNSET_TEMPLATES':
            return [];
        default:
            return state;
    }
  };

  export default templateReducer;
