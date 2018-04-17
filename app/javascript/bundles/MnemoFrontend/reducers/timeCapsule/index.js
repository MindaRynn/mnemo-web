import { combineReducers } from 'redux';

import timeCapsuleReducer from './timeCapsule';
import mediaReducer from './media';

const timeCapsuleRootReducer = combineReducers({
  timeCapsule: timeCapsuleReducer,
  media: mediaReducer
});

export default timeCapsuleRootReducer;
