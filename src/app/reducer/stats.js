let initialState = [];

export default (state=initialState, action) => {

    let {type, payload} = action;
    console.log('in stats reducer:::::', payload)
   
    switch(type) {

        case 'INIT':
        return payload || initialState;

        default:
        return state;
    }
}