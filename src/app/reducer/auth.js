export default (state=false, action) => {
  
  let {type, payload} = action;
  
  switch(type) {
      case "LOGIN":
        return true;
          
      case "LOGOUT":
        return false;

      case "SAVE_USER":
      console.log('user payload is ', payload)
        return [...state, payload];
          
      default:
        return state;
  }
}