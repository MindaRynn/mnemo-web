import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './app';
import directMessageReducer from './directMessage';

const rootReducer = combineReducers({
  routing: routerReducer,
  // Application reducers
  app: appReducer,
  directMessage: directMessageReducer
});

export default rootReducer;
