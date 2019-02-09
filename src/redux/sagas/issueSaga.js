// *----------* Saga *----------*
import { put as dispatch, takeLatest } from 'redux-saga/effects';

// *----------* Axios *----------*
import axios from 'axios';

// *----------* Issue Sagas *----------*

// Worker saga responsible for handling POST_ISSUE actions
function* postIssue(action){
    try {

        // Deconstruct payload & prepare for axios post call
        const {
            office_action_id,
            template_type_id,
            claims,
            template_id
        } = action.payload;

        // Send reques to API to have issue posted to database
        yield axios.post('/api/issue/add',{
            office_action_id,
            template_type_id,
            claims,
            template_id
        })

        // Now that database has update, we must make a fetch again to update redux
        yield dispatch({type:'FETCH_ISSUES'}) 
    } catch (error) {
        console.log(`Error in postIssue: ${error}`);
    }
}

// Worker saga responsible for handling FETCH_ISSUES actions
function* fetchIssues(action){
    try {

        // Assuming returning issues by office_action_id
        const {office_action_id} = action.payload;

        // Request issues from API
        const issuesResponse = yield axios.get(`/api/issue/by_office_action/${office_action_id}`);

        // Update redux with data
        yield dispatch({
            type: 'SET_ISSUES',
            payload: issuesResponse.data
        })

    } catch (error) {
        console.log(`Error in fetchIssues: ${error}`);
    }
}

// Worker saga responsible for handling UPDATE_ISSUE actions
function* updateIssue(action){
    try {

        // Deconstruct payload
        const {
            id,
            office_action_id,
            template_type_id,
            claims,
            template_id,
        } = action.payload;

        // Request an update in API with properties passed from action
        yield axios(`/api/issue/edit/${id}`, {
            office_action_id,
            template_type_id,
            claims,
            template_id
        })

        // Now that database has been updated, we need to relect this in redux
        yield dispatch({type: 'FETCH_ISSUES'}) 

    } catch (error) {
        console.log(`Error in updateIssue: ${error}`);
    }
}

// Worker saga responsible for handling DELETE_ISSUE actions
function* deleteIssue(action){

    try {

        // Deconstruct payload
        const {
            id,
            office_action_id
        } = action.payload;

        // request deletion from api
        yield axios.delete(`/api/issue/delete/${id}`)

        // update redux
        yield dispatch({type: 'FETCH_ISSUES', payload: {office_action_id}})

    } catch (error) {
        console.log(`Error in deleteIssue: ${error}`);
    }

}

// Top Level saga responsible for triggering multiple sagas and defining how concurrent sagas are handled
function* issueSaga(){
    yield takeLatest('POST_ISSUE', postIssue);
    yield takeLatest('FETCH_ISSUES', fetchIssues); // <--- THIS CURRENTLY ASSUMES ROUTE RETURNS ISSUES BY office_action_id AND ROUTE IS GET /API/ISSUE
    yield takeLatest('UPDATE_ISSUE', updateIssue);
    yield takeLatest('DELETE_ISSUE', deleteIssue);
}

export default issueSaga;