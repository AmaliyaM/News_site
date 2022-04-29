import { combineReducers } from 'redux';

import usersReducer from './users';
import newsReducer from './news';
import utilsReducer from './utils';

export default combineReducers({ usersReducer, newsReducer, utilsReducer });
