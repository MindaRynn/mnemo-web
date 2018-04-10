import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './app';
import directMessageReducer from './directMessage';
import feedReducer from './feed';
import profileReducer from './profile';

const rootReducer = combineReducers({
  routing: routerReducer,
  // Application reducers
  app: appReducer,
  directMessage: directMessageReducer,
  feed: feedReducer,
  profile: profileReducer,
});

export default rootReducer;
