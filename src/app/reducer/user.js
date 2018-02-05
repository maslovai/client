export default (state={}, {type, payload}) => {
  
  switch(type) {

      case 'LOGIN':
          return payload || {};

      case 'LOGOUT':
          return {};

      case 'UPDATE_PROFILE':
          return Object.assign({}, state, payload)

      default:
      return state;
  }
  
 
  
}