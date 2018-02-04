import {combineReducers} from 'redux';

import auth from './auth';
import route from './routes';
import profile from './profile';
import user from './user';

export default combineReducers({
    auth, route, profile, user
});