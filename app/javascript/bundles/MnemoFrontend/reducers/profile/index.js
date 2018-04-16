import { combineReducers } from 'redux';

import capsuleReducer from './timeCapsule';
import mediaReducer from './media';

const profileRootReducer = combineReducers({
  timeCapsule: capsuleReducer,
  media: mediaReducer
});

export default profileRootReducer;
