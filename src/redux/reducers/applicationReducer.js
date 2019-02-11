// Reducer responsible for providing access to all information of an application, including action responses
const applicationReducer = (state = {
    applicationList: [], // List of all applications
    currentApplication: {}, // Information about the selected application (Applicant, file date, examiner, etc.)
    currentApplicationOfficeActionResponseList: [], // List of all O.A.Rs for the selected application
    currentOfficeActionResponse: {}, // Information about the O.A.R (dates & status) 
    currentOficeActionIssueList: [], // List of issues for selected office action
    currentOfficeActionResponseTextList:[], // List of response_texts for selected O.A.R
}, action) => {

    switch(action.type){

        // Application list
        case 'SET_APPLICATIONS':
            return {... state, applicationList: action.payload};

        // Current Application
        case 'SET_APPLICATION':
            return {... state, currentApplication: action.payload}
        
        // Current Application's O.A.Rs
        case 'SET_OFFICE_ACTIONS':
            return {... state, currentApplicationOfficeActionResponseList: action.payload}

        // Current O.A.R
        case 'SET_OFFICE_ACTION':
            return {... state, currentOfficeActionResponse: action.payload}

        case 'SET_ISSUES':
            return {... state, currentOficeActionIssueList: action.payload}

        // Current O.A responses
        case 'SET_RESPONSES':
            return {... state, currentOfficeActionResponseTextList: action.payload}

        default:
            return state;
    }
    
}

export default applicationReducer;