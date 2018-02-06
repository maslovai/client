import superagent from 'superagent';
import cookie from 'react-cookies';
  
export const addGroup = (id, group) => (dispatch) => {
  
  let token = cookie.load('X-BBB-Token');
  
  if (token) { 
      
    superagent.put( `${__API_URL__}/group`)
      .set('Authorization', `Bearer ${token}`)
      .send({id: id, name: group})
      .then(res => {
        console.log('res is ', res.body);
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
        console.log('res is ', res.body);
          if(!res.body.noGroupExists)
          dispatch( updateUser(res.body) );
      })
      .catch(console.error);
  }
}


const getGroups = (groupNames) => ({
  type: 'GET_GROUPS',
  payload: groupNames
})

const updateUser = (user) => ({
  type: 'USER_UPDATE',
  payload: user
})

const loginAction = (user) => ({
  type: 'LOGIN',
  payload: user
})