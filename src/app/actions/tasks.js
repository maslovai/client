const initState = [];
export const taskCreate = (task)=>{
    task.createDate = new Date();
    return {
        type:"ADD_TASK",
        payload:task
    }
}
export const taskDelete = (task) => {
    return {
        type: "DELETE_TASK",
        payload: task
    }
}
export const taskUpdate = (task) => {
    return {
        type: "UPDATE_TASK",
        payload: task
    }
}
