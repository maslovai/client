// TODO: Set a default route
// TODO: Handle the "LOGIN" action. Might want to use that as automatic redirect to somewhere else.

let defaultRoute = '/login';

export default (state=defaultRoute, {type, payload}) => {    
   
    switch(type) {

        case "SWITCH_ROUTE":
          return payload;

        case "LOGOUT": 
          return '/login';
        
        case "LOGIN" :
          return '/chat';
        

        default: 
          return state;   
    } 
}