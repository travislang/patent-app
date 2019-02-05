// Reducer responsible for providing access to all information of an application, including action responses
const applicationReducer = (state = {application:{}, actionResponses:[]}, action) => {

    switch(action.type){
        case 'SET_APPLICATION':
            return {application: action.payload, actionResponses:[]}
        case 'SET_RESPONSES':
            return {... state, actionResponses: action.payload}
        default:
            return state;
    }
    
}

export default applicationReducer;