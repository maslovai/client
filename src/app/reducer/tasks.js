let initialState = [];

export default (state=initialState, action) => {

  let {type, payload} = action;

  switch(type) {

    case 'INIT':
        console.log("INIT");
        return payload || initialState;

    case 'CREATE_TASK':
        console.log('PAY - fucking - LOAD is ', payload)
        return [...state, payload];

    case 'UPDATE_TASK':
        return state.map(task => task._id === payload._id ? payload : task);

    case 'DELETE_TASK':
        return state.filter(task =>{
            // console.log('in reducer delete:::', task, payload)
            return task._id !== payload._id
        }) 

    case 'RESET':
        return initialState;

    default:
        return state;
  }

};