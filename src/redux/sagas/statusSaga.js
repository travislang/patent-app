// *----------*  *----------*
import { put as dispatch, takeLatest } from 'redux-saga/effects';

// *----------*  *----------*
import axios from 'axios';

// *----------* status Sagas *----------*

// worker saga responsible for handling FETCH_STATUSES actions
function* fetchStatuses(){
    try {

        // Request statuses from API and destructure the data property and alias it as statusResponseData
        const { data : statusResponseData } = yield axios.get('/api/status');

        // Update redux
        yield dispatch({
            type: 'SET_STATUSES',
            payload: statusResponseData
        })

    } catch (error) {
        console.log(`Error in fetchStatuses: ${error}`);
    }
}

function* statusSaga (){
    yield takeLatest('FETCH_STATUSES', fetchStatuses);
    
}

export default statusSaga;