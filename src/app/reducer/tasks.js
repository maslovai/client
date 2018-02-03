const initialState = [];


export default (state=initialState, action) => {

    let {type, payload} = action;
    switch(type){

        case 'ADD_TASK':
            return [... state, payload];
        case 'DELETE_TASK':
            return state.filter((task) => task.id!==payload.id);
        case 'UPDATE_CATEGORY':
            return state.map((task,i) => task.id===payload.id ? payload : task);
        default: return state;
    }

}