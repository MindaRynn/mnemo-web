import { combineReducers } from 'redux';

import tagReducer from './tag';
import timeCapsuleReducer from './timeCapsule';
import mediaReducer from './media';

const feedRootReducer = combineReducers({
  tag: tagReducer,
  timeCapsule: timeCapsuleReducer,
  media: mediaReducer
});

export default feedRootReducer;
