import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchApplication(action){
    try {
        // clear the Application reducer
        console.log(action.payload)
        yield put({ type: 'CLEAR_USPTO_APP_DATA'}); 
        // set variable response from route
        const response = yield axios.post('api/uspto', {applId: action.payload});

        // send response to reducer
        yield put({ type: 'SET_USPTO_APP_DATA', payload: response.data});

    } catch(error) {
        console.log('Fail to get application', error)
    }
}

function* usptoSaga() {
    yield takeLatest ('FETCH_USPTO_APP_DATA', fetchApplication);
}

export default usptoSaga;