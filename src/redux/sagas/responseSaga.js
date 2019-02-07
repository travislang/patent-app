// *----------*  *----------*
import { put as dispatch, takeLatest } from 'redux-saga/effects';

// *----------*  *----------*
import axios from 'axios';

// *----------* response Sagas *----------*

// Worker saga responsible for handling POST_RESPONSE actions
function* postResponse(action){

    try {

        // Deconstruct payload
        const {
            officeActionId,
            issue_id, 
            text
        } = action.payload;

        // Request a post to API
        yield axios.post('/api/response/add',{
            issue_id, 
            text 
        });

        // Update redux
        yield dispatch({type:'FETCH_RESPONSES', payload: {officeActionId}});

    } catch (error) {
        console.log(`Error in postResposne: ${error}`);
    }
}

// Worker saga responsible for handling FETCH_RESPONSES actions
function* fetchResponses(action){

    try {
        console.log(`Here`);
        // Deconstruct payload
        const { officeActionId } = action.payload;

        // 
        const { data : responseResponseData} = yield axios.get(`/api/response/by_office_action/${officeActionId}`);

        //
        yield dispatch({
            type: 'SET_RESPONSES',
            payload: responseResponseData
        })

    } catch (error) {
        console.log(`Error in fetchResponses: ${error}`);
    }
}


function* responseSaga (){

    yield takeLatest(`POST_RESPONSE`, postResponse);
    yield takeLatest(`FETCH_RESPONSES`, fetchResponses);
    // yield takeLatest(`UPDATE_RESPONSE`, updateResponse);
    // yield takeLatest(`DELETE_RESPONSE`, deleteResponse);
}

export default responseSaga;