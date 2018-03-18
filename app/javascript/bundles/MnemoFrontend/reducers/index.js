import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import directMessageReducer from './directMessage';

const rootReducer = combineReducers({
  routing: routerReducer,
  // Application reducers
  directMessage: directMessageReducer,
});

export default rootReducer;
