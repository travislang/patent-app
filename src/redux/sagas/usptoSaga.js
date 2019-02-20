import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

function* fetchApplication(action){
    try {
        // clear the Application reducer
        yield put({ type: 'CLEAR_USPTO_APP_DATA'}); 
        // set variable response from route
        const response = yield axios.post('api/uspto', {applId: action.payload});
        response.data.applicantName = response.data.applicants[0].nameLineOne;
        response.data.appFilingDate = moment(response.data.appFilingDate).format('L');
        response.data.LAST_MOD_TS = moment(response.data.LAST_MOD_TS).format('L');

        // send response to reducer
        yield put({ type: 'SET_USPTO_APP_DATA', payload: response.data});

    } catch(error) {
        console.error('Fail to get application', error)
    }
}

function* usptoSaga() {
    yield takeLatest ('FETCH_USPTO_APP_DATA', fetchApplication);
}

export default usptoSaga;