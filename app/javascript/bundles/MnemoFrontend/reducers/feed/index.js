import { combineReducers } from 'redux';

import tagReducer from './tag';
import timeCapsuleReducer from './timeCapsule';
import mediaReducer from './media';
import userReducer from './user';

const feedRootReducer = combineReducers({
  tag: tagReducer,
  timeCapsule: timeCapsuleReducer,
  media: mediaReducer,
  user: userReducer
});

export default feedRootReducer;
