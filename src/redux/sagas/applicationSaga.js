// *----------*  *----------*
import { put as dispatch, takeLatest } from 'redux-saga/effects';

// *----------*  *----------*
import axios from 'axios';

// *----------* ApplicationList Sagas *----------*

// Worker saga responsible for handling FETCH_APPLICATIONS actions
function* fetchApplications() {
    try {

        // Request all applications 
        const applicationResponseData = yield axios.get('api/application/status');

        // Update redux with application
        yield dispatch({
            type: 'SET_APPLICATIONS',
            payload: applicationResponseData.data
        })

    } catch (error) {
        console.log(`Error in fetchApplications: ${error}`);
    }
}

// *----------* Application Sagas *----------*

// worker saga responsible for handling FETCH_APPLICATION actions
function* fetchApplication(action) {
    try {

        // Request an application by id (sent as payload) ->
        const { data: applicationResponseData } = yield axios.get(`/api/application/${action.payload}`);

        // Update redux with application
        yield dispatch({
            type: 'SET_APPLICATION',
            payload: applicationResponseData[0]
        })

    } catch (error) {
        console.log(`Error in fetchApplication: ${error}`);
    }
}

// Worker saga responsible for handling POST_APPLICATION actions
function* postApplication(action) {

    try {

        // Deconstruct payload 
        const {
            user_id,
            applicant_name,
            filed_date,
            last_checked_date,
            status_date,
            application_number,
            title,
            inventor_name,
            examiner_name,
            group_art_unit,
            docket_number,
            comfirmation_number
        } = action.payload;

        // Send a request to our API to have application posted in database
        yield axios.post('/api/application/add', {
            user_id,
            applicant_name,
            filed_date,
            last_checked_date,
            status_date,
            application_number,
            title,
            inventor_name,
            examiner_name,
            group_art_unit,
            docket_number,
            comfirmation_number
        })

        // Now that our applications table has been updated, we need to reflect this in our redux state
        yield dispatch({ type: 'FETCH_APPLICATIONS' })
    } catch (error) {
        console.log(`Error in postApplication: ${error}`);
    }
}

// Worker saga responsible for handling UPDATE_APPLICATION actions
function* updateApplication(action) {
    try {

        // Deconstruct payload
        const {
            id,
            user_id,
            applicant_name,
            filed_date,
            last_checked_date,
            status_date,
            application_number,
            title,
            inventor_name,
            examiner_name,
            group_art_unit,
            docket_number
        } = action.payload;

        // Send request to api to update an application by id, and to update its contents 
        yield axios.put(`/api/application/edit/${id}`, {
            user_id,
            applicant_name,
            filed_date,
            last_checked_date,
            status_date,
            application_number,
            title,
            inventor_name,
            examiner_name,
            group_art_unit,
            docket_number
        });

        // Now that our applications table has been updated, we need to reflect this in our redux state
        yield dispatch({ type: 'FETCH_APPLICATIONS' })


    } catch (error) {
        console.log(`Error in updateApplication: ${error}`);
    }
}

// Worker saga responsible for handling DELETE_APPLICATION actions
function* deleteApplication(action) {

    try {

        // deconstruct payload
        const id = action.payload;

        console.log(`Deleting application ${id}`);

        // Send request to api to delete an application by id
        yield axios.delete(`api/application/delete/${id}`);

        // Since our database has been updated, we need also update redux
        yield dispatch({ type: 'FETCH_APPLICATIONS' });

    } catch (error) {
        console.log(`Error in deleteApplication: ${error}`);
    }

}

// Top Level saga responsible for triggering multiple sagas and defining how concurrent sagas are handled
function* applicationSaga() {

    // ApplicationList actions
    yield takeLatest('FETCH_APPLICATIONS', fetchApplications);

    // Application Actions
    yield takeLatest('FETCH_APPLICATION', fetchApplication);
    yield takeLatest('POST_APPLICATION', postApplication);
    yield takeLatest('UPDATE_APPLICATION', updateApplication);
    yield takeLatest('DELETE_APPLICATION', deleteApplication);

}

export default applicationSaga;