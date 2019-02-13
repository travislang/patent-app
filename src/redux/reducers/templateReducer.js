// Reducer responsible for providing access to all templates
const templateReducer = (state = { templates:[], types: [], allTemplates: [] }, action) => {
    switch (action.type) {
        case 'SET_TEMPLATES':
            return {...state, templates: action.payload};
        case 'SET_TEMPLATE_TYPES':
            return {...state, types: action.payload};
        case 'SET_ALL_TEMPLATES;':
            return {...state, allTemplates: action.payload};
        default:
            return state;
    }
  };

  export default templateReducer;
