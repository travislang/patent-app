// *----------* Saga *----------*
import { put as dispatch, takeLatest} from 'redux-saga/effects';

// *----------* Axios *----------*
import axios from 'axios';

// *----------* Template Sagas *----------*

function* postTemplate(action){
    try {


        const {
        user_id,
        type_id,
        template_name,
        content,
        } = action.payload;
        
        yield axios.post('/api/template/add', {
            user_id,
            type_id,
            template_name,
            content,
        });



        yield dispatch({type:'FETCH_ALL_TEMPLATES'})

    } catch (error) {
        console.log(`Error in postTemplate: ${error}`);
    }
}

// Worker saga responsible for handling FETCH_TEMPLATES actions
function* fetchTemplates(action){
    try {

        // destructure payload
        const {type_Id} = action.payload;

        // Request templates from API by
        const { data : templatesResponseData } = yield axios.get(`/api/template/by_type/${type_Id}`);

        // Updat redux 
        yield dispatch({
            type: 'SET_TEMPLATES',
            payload: templatesResponseData
        })

    } catch (error) {
        console.error(`Error in fetchTemplates: ${error}`);
    }
}

// Worker Saga responsible for handling FETCH_TEMPLATE_TYPES actions
function* fetchTemplateTypes (){
    try {

        // Request template types, destructure response, and alias it
        const { data : templatesResponseData } = yield axios.get('/api/template/types')

        // Update redux 
        yield dispatch({
            type: 'SET_TEMPLATE_TYPES',
            payload: templatesResponseData
        })

    } catch (error) {
        console.error(`Error in fetchTemplateTypes`);
    }
}

function* fetchAllTemplates() {
    try {
        const { data: templatesResponseData } = yield axios.get('/api/template/all')
        yield dispatch({
            type: 'SET_ALL_TEMPLATES',
            payload: templatesResponseData
        });
    } catch (error) {
        console.error(`Error in fetchAllTemplates`);
    }
}

function* deleteTemplate(action){
    try {
        const {id} = action.payload;

        yield axios.delete(`/api/template/delete/${id}`);

        yield dispatch({type:'FETCH_ALL_TEMPLATES'})
    } catch (error) {
        console.error(`Error in deleteTemplate`);
    }
}

function* templateSaga (){
    yield takeLatest('POST_TEMPLATE', postTemplate);
    yield takeLatest('FETCH_TEMPLATES', fetchTemplates);
    yield takeLatest('FETCH_TEMPLATE_TYPES', fetchTemplateTypes);
    yield takeLatest('FETCH_ALL_TEMPLATES', fetchAllTemplates);
    yield takeLatest('DELETE_TEMPLATE', deleteTemplate)
}

export default templateSaga;