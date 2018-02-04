const initState = [];
import superagent from'superagent';
let API = `${__API_URL__}`;

export const taskInitialize = () => dispatch => {
     console.log('in tasks init::::');
    superagent
        .get(`${API}/task`)
        .then(res => {
            console.log('in task init:::::', res)
            let arr = res.body;
            dispatch(initAction(arr));    
        })
        .catch(console.error);
}

export const taskCreate = payload => dispatch=>{
    superagent
    .post(`${API}/task`)
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
        type:"ADD_TASK",
        payload:task
    }
}

export const updateAction = task => {
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
