import { combineReducers } from 'redux';

import timeCapsuleReducer from './timeCapsule';
import mediaReducer from './media';
import tagReducer from './tag';

const timeCapsuleRootReducer = combineReducers({
  timeCapsule: timeCapsuleReducer,
  media: mediaReducer,
  tag: tagReducer
});

export default timeCapsuleRootReducer;
