const actionResponseReducer = (state = {responseText:[], sections:[]}, action) =>{

    switch(action.payload){
        case 'SET_RESPONSE_TEXT':
            return {... state, responseText: action.payload}
        case 'SET_SECTIONS':
            return {... state, section: action.payload}
    }
    
}

export default actionResponseReducer;