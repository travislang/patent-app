// *----------*  *----------*
import { put as dispatch, takeLatest } from 'redux-saga/effects';

// *----------*  *----------*
import axios from 'axios';

// *----------* Office action Sagas *----------*

// Worker saga responsible for handling 'FETCH_OFFICE_ACTIONS' actions
function* fetchOfficeActions(action){
    try {
        
        // Deconstruct payload
        const {
            application_id
        } = action.payload;

        // Request all office actions by id
        const officeActionResponse = yield axios.get(`/api/office_action/${application_id}`);
    
        // Update redux
        yield dispatch({
            type: 'SET_OFFICE_ACTIONS',
            payload: officeActionResponse.data
        })

    } catch (error) {
        console.log(`Error in fetchOfficeActions: ${error}`);
    }
}

// Worker saga responsible for handling 'POST_OFFICE_ACTIONS' actions
function* postOfficeAction(action){
    try {
        
        // Deconstruct payload
        const {
        application_id,
        response_due_date,
        response_sent_date,
        uspto_status,
        status_id } = action.payload;

        // Request to post an office action
        yield axios.post('/api/office_action/add',{
            response_due_date,
            response_sent_date,
            uspto_status,
            status_id
        });

        // Update redux
        yield dispatch({type: 'FETCH_OFFICE_ACTIONS', payload: {application_id}})

    } catch (error) {
        console.log(`Error in postOfficeAction: ${error}`);
    }
}

// worker saga responsible for handling 'UPDATE_OFFICE_ACTION' actions
function* updateOfficeAction(action){
    try {

        // Deconstruct payload
        const {
            id,
            application_id, // Office actions don't change applications, however the route requests that the new application id is sent
            uspto_mailing_date,
            response_sent_date,
            uspto_status,
            status_id,
        } = action.payload;

        // Request to update O.A
        yield axios.put(`/api/office_action/edit/${id}`,{
            application_id,
            uspto_mailing_date,
            response_sent_date,
            uspto_status,
            status_id,
        })

        // Update redux
        yield dispatch({type: 'FETCH_OFFICE_ACTIONS', payload: {application_id}})

    } catch (error) {
        console.log(`Error in updateOfficeAction: ${error}`);
    }
}

// worker saga responsible for handling DELETE_OFFICE_ACTION actions
function* deleteOfficeAction(action){
    try {

        // Deconstruct payload
        const {
            id,
            application_id 
        } = action.payload;

        // request to have office action deleted
        yield axios(`/api/office_action/delete/${id}`)

        // Update redux
        yield dispatch({type: 'FETCH_OFFICE_ACTIONS', payload: {application_id}})

    } catch (error) {
        console.log(`Error in deleteOfficeAction: ${error}`);
    }
}

// Top Level saga responsible for triggering multiple sagas and defining how concurrent sagas are handled
function* officeActionSaga (){

// Office action list
// yield takeLatest('FETCH_OFFICE_ACTIONS',fetchOfficeActions);

// Office action
yield takeLatest('FETCH_OFFICE_ACTIONS',fetchOfficeActions);
yield takeLatest('POST_OFFICE_ACTIONS',postOfficeAction);
yield takeLatest('UPDATE_OFFICE_ACTIONS',updateOfficeAction);
yield takeLatest('DELETE_OFFICE_ACTIONS',deleteOfficeAction);
}

export default officeActionSaga;