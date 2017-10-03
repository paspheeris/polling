import { combineReducers } from 'redux';

import polls from './polls';
import users from './users';
import ui from './ui';
import auth from './auth';

const rootReducer = combineReducers({users, polls, ui, auth});

export default rootReducer;