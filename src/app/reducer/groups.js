export default (state={}, {type, payload}) => {
  
  switch(type) {

      case 'LOGIN':
         console.log('@@@@@payload is ', payload)
          return payload || {};

      case 'LOGOUT':
          return null;

      case 'USER_UPDATE':
        return Object.assign({}, state, payload);

      case 'GET_GROUPS':
        return payload || [];

      default:
      return state;
  }
}