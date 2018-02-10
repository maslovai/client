import superagent from'superagent';
let API = `${__API_URL__}`;

export const statsInitialize = (groupID) => dispatch => {
    // console.log('in stats actions, groupID:   ', groupID)
    superagent
        .get(`${API}/stats/${groupID}`)
        .then(res => {
            // console.log("in actions: res.body", res.body);
            dispatch(initAction(res.body))
        });
}

const initAction = statsArray => ({
    type: 'INIT',
    payload: statsArray
 })