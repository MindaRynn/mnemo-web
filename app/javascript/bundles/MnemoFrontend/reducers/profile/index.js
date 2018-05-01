import { combineReducers } from 'redux';

import capsuleReducer from './timeCapsule';
import mediaReducer from './media';
import tagReducer from './tag';
import userReducer from './user';

const profileRootReducer = combineReducers({
  timeCapsule: capsuleReducer,
  media: mediaReducer,
  tag: tagReducer,
  user: userReducer
});

export default profileRootReducer;
