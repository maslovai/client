import superagent from 'superagent';
import cookie from 'react-cookies';

export const showGroups = (user) => (dispatch) => {
  let token = cookie.load('X-BBB-Token');
    if(token){
      superagent.get(`${__API_URL__}/user`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .then(response => {
          dispatch(getGroups(response.body));
      })
      .catch(console.error);
    };
}
  
// export const updateGroups = (user) => (dispatch) => {
  
//   let token = cookie.load('X-BBB-Token');
  
//   if (token) { 
      
//     superagent.put( `${__API_URL__}/user`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(user)
//       .then(response => {
//           dispatch( updateAction(response.body) );
//       })
//       .catch(console.error);
//   }
// };


const getGroups = (user) => ({
  type: 'GET',
  payload: user
})

const loginAction = (user) => ({
  type: 'LOGIN',
  payload: user
})