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
            office_Action_Id,
            issue_id, 
            text
        } = action.payload;

        // Request a post to API
        yield axios.post('/api/response/add',{
            issue_id, 
            text 
        });

        // Update redux
        yield dispatch({type:'FETCH_RESPONSES', payload: {office_Action_Id}});
        yield dispatch({ type: 'FETCH_ISSUES', payload: { office_action_id: office_Action_Id } })
    } catch (error) {
        console.error(`Error in postResposne: ${error}`);
    }
}

// Worker saga responsible for handling FETCH_RESPONSES actions
function* fetchResponses(action){

    try {
        // Deconstruct payload
        const { office_Action_Id } = action.payload;

        // 
        const { data : responseResponseData} = yield axios.get(`/api/response/by_office_action/${office_Action_Id}`);

        //
        yield dispatch({
            type: 'SET_RESPONSES',
            payload: responseResponseData
        })

    } catch (error) {
        console.error(`Error in fetchResponses: ${error}`);
    }
}

// Worker saga responsible for handling UPDATE_RESPONSES actions
function* updateResponse(action){
    try {

        // Deconstruct payload
        const{
            id,
            office_Action_Id,
            issue_id, 
            text
        } = action.payload;

        // Make request to api to update response
        yield axios.put(`/api/response/edit/${id}`,{
            issue_id, 
            text
        })

        // Update redux
        yield dispatch({type:'FETCH_RESPONSES', payload: {office_Action_Id}});
    } catch (error) {
        console.error(`Error in updateResponse: ${error}`);
    }
}

function* deleteResponse(action){
try {

    // Deconstruct payload
    const {
        id,
        office_Action_Id,
        issue_id,
    } = action.payload;

    // Make delete request to api with response id as query param
    yield axios.delete(`/api/response/delete/${id}`,)

    // Update redux
    yield dispatch({type:'FETCH_RESPONSES', payload: {office_Action_Id}});
    yield dispatch({ type: 'FETCH_ISSUES', payload: { office_action_id: office_Action_Id } });
} catch (error) {
    console.error(`Error in deleteResponse: ${error}`);
}
}

function* responseSaga (){

    yield takeLatest(`POST_RESPONSE`, postResponse);
    yield takeLatest(`FETCH_RESPONSES`, fetchResponses);
    yield takeLatest(`UPDATE_RESPONSE`, updateResponse);
    yield takeLatest(`DELETE_RESPONSE`, deleteResponse);
}

export default responseSaga;