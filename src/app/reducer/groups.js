
let initialState = {}

export default (state=initialState, {type, payload}) => {
  
  switch(type) {

      case 'LOGIN':
        return payload || {};

      case 'LOGOUT':
         return initialState;

         case 'USER_UPDATE':		
           return Object.assign({}, state, payload);

      default:
        return state;
  }
}
