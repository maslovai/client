// const initState = [];
import superagent from'superagent';
let API = `${__API_URL__}`;

export const tasksInitialize = (groupID) => dispatch => {
    //  console.log('in tasks init::::',`${API}/task/get`);
    superagent
        .get(`${API}/tasks/${groupID}`)
        .then(res => {
            dispatch(initAction(res.body));    
        })
        .catch(console.error);
}

export const taskCreate = payload => dispatch => {
    superagent
    .post(`${API}/task`)
    .send({"name" : payload.name, "group_ID" : payload.groupID})
    .then(res => {
        dispatch(createAction(res.body))
    } )
    .catch(err => console.log(err))
}


export const taskUpdate = payload => dispatch => {
    superagent
    .put(`${API}/task/${payload._id}`)
    .send(payload)
    .then((res)=>{
        dispatch(updateAction(res.body))
    })
    .catch(err=>console.log(err))
}

export const taskDelete = payload => dispatch => {
    superagent
    .delete(`${API}/task/${payload._id}`)
    .then(()=>{
        dispatch(deleteAction(payload));
    })
};

const initAction = list => ({
    type: 'INIT',
    payload: list
 })

const createAction = task => {
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


const deleteAction = task => {
    return {
        type: "DELETE_TASK",
        payload: task
    }
}
