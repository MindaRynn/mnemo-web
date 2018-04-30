import { combineReducers } from 'redux';

import capsuleReducer from './timeCapsule';
import mediaReducer from './media';
import tagReducer from './tag';

const profileRootReducer = combineReducers({
  timeCapsule: capsuleReducer,
  media: mediaReducer,
  tag: tagReducer
});

export default profileRootReducer;
