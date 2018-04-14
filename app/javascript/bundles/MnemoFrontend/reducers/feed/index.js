import { combineReducers } from 'redux';

import timeCapsuleReducer from './timeCapsule';

const feedRootReducer = combineReducers({
  timeCapsule: timeCapsuleReducer,
});

export default feedRootReducer;
