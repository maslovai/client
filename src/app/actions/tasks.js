// const initState = [];
import superagent from'superagent';
let API = `${__API_URL__}`;

export const tasksInitialize = () => dispatch => {
    //  console.log('in tasks init::::',`${API}/task/get`);
    superagent
        .get(`${API}/task`)
        .then(res => {
            // console.log('in task init:::::', res.body)
            dispatch(initAction(res.body));    
        })
        .catch(console.error);
}

export const taskCreate = payload => dispatch => {
    console.log("in actions - post note::::", payload)
    superagent
    .post(`${API}/task`)
    .send({"name" : payload.name, "group_ID" : payload.groupID})
    .then(res => {
        // console.log('after post:::::', res.body)
        dispatch(createAction(res.body))
    } )
    .catch(err => console.log(err))
}


export const taskUpdate = payload => dispatch => {
    console.log("in actions update, payload", payload)
    superagent
    .put(`${API}/task/${payload.taskID}`)
    .send(payload)
    .then((res)=>{
        console.log('after update returns from backend::::::::', res.body)
        dispatch(updateAction(res.body))
    })
    .catch(err=>console.log(err))
}

export const taskDelete = payload => dispatch => {
    console.log("in actions delete, payload._id:", payload._id)
    superagent
    .delete(`${API}/task/${payload._id}`)
    .then(()=>{
        console.log('after delete returns from backend::::::::', payload)
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
