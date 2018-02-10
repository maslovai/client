import {combineReducers} from 'redux';
import auth from "./auth";
import route from "./routes";
import tasks from "./tasks";
import user from './groups';
import stats from './stats'

export default combineReducers({
    auth, route, tasks, user, stats
});