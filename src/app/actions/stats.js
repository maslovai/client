import superagent from'superagent';
let API = `${__API_URL__}`;

export const statsInitialize = (groupID) => dispatch => {
    console.log('in stats actions, groupID:   ', groupID)
    superagent
        .get(`${API}/stats/${groupID}`)
        .then(res => {
            //we will probably need to do something with res.body to make it an array of objects
            let statsArray=[]
            (res.body).forEach(element=>statsArray.push({value:i, label:element.name}))
            console.log("in action: statsArray", statsArray);
            dispatch(initAction(statsArray))
        });
}

const initAction = statsArray => ({
    type: 'INIT',
    payload: statsArray
 })