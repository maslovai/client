import superagent from 'superagent';
import cookie from 'react-cookies';
  
export const addGroup = (id, group) => (dispatch) => {
  
  let token = cookie.load('X-BBB-Token');
  
  if (token) { 
      
    superagent.post( `${__API_URL__}/group`)
      .set('Authorization', `Bearer ${token}`)
      .send({id: id, name: group})
      .then(res => {
          dispatch( updateUser(res.body) );
      })
      .catch(console.error);
  }
};

export const joinGroup = (id, alias) => (dispatch) => {

  let token = cookie.load('X-BBB-Token');
  
  if (token) { 

    superagent.put( `${__API_URL__}/user/${alias}`)
      .set('Authorization', `Bearer ${token}`)
      .send({id: id})
      .then(res => {
          if(!res.body.noGroupExists)
          dispatch( updateUser(res.body) );
      })
      .catch(console.error);
  }
}

export const remove = (id, groupID) => (dispatch) => {

  let token = cookie.load('X-BBB-Token');

  if(token) {

    superagent.delete( `${__API_URL__}/group/${groupID}`)
    .set('Authorization', `Bearer ${token}`)
    .send({id: id})
    .then(res => {
      console.log('!!!!DELETE!!! res.body is ', res.body);
      dispatch(updateUser(res.body))
    })
    .catch(console.error);

  }
}


const updateUser = (user) => ({
  type: 'USER_UPDATE',
  payload: user
})

const loginAction = (user) => ({
  type: 'LOGIN',
  payload: user
})