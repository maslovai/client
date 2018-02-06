import {combineReducers} from 'redux';
import auth from "./auth";
import route from "./routes";
import tasks from "./tasks";
import user from './groups';

export default combineReducers({
    auth, route, tasks, user
});