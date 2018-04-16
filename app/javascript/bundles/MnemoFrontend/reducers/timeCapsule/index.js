import { combineReducers } from 'redux';

import timeCapsuleReducer from './timeCapsule';

const timeCapsuleRootReducer = combineReducers({
  timeCapsule: timeCapsuleReducer
});

export default timeCapsuleRootReducer;
