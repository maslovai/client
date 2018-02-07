
let initialState = {}

export default (state=initialState, {type, payload}) => {
  
  switch(type) {

      case 'LOGIN':
        return payload || {};

      case 'LOGOUT':
         return initialState;

      case 'GET_GROUPS':
        return payload || [];

      default:
        return state;
  }
}