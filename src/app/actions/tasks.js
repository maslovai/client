// const initState = [];
import superagent from'superagent';
let API = `${__API_URL__}`;

export const tasksInitialize = () => dispatch => {
     console.log('in tasks init::::',`${API}/task/get`);
    superagent
        .get(`${API}/task/get`)
        .then(res => {
            // console.log('in task init:::::', res.body)
            dispatch(initAction(res.body));    
        })
        .catch(console.error);
}

export const taskCreate = payload => dispatch => {
    console.log("in actions post note::::", payload.name)
    superagent
    .post(`${API}/task/post`)
    .send({"name" : payload.name})
    .then(res => {
        console.log('after post:::::', res.body)
        dispatch(createAction(res.body))
    } )
    .catch(err => console.log(err))
}


export const taskUpdate = payload => dispatch => {
    superagent
        .put(`${API}/task`)
        .send(payload)
        .then(()=>{
            dispatch(updateAction(payload))
        })
        .catch(err=>console.log(err))
}

const createAction = task =>{
    return {
        type: "CREATE_TASK",
        payload:task
    }
}

const updateAction = task => {
    return {
        type: "UPDATE_TASK",
        payload: task
    }
}

const initAction = list => ({
    type: 'INIT',
    payload: list
 });

const deleteAction = task => {
    return {
        type: "DELETE_TASK",
        payload: task
    }
}
