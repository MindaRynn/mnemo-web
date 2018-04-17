import { combineReducers } from 'redux';

import capsuleReducer from './timeCapsule';
import mediaReducer from './media';

const profileRootReducer = combineReducers({
  userTimeCapsule: capsuleReducer,
  media: mediaReducer
});

export default profileRootReducer;
