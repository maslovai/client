let initialState = [];

export default (state=initialState, action) => {

  let {type, payload} = action;

  switch(type) {

    case 'INIT':
        return payload || initialState;

    case 'CREATE_TASK':
        return [...state, payload];

    case 'UPDATE_TASK':
        return state.map(task => task._id === payload._id ? payload : task);

    case 'DELETE_TASK':
        return state.filter(task => task._id !== payload._id); 
    
        return {group: payload} || intialState;

    case 'RESET':
        return initialState;

    default:
        return state;
  }

};