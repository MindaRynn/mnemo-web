import { combineReducers } from 'redux';

import capsuleReducer from './timeCapsule';

const profileRootReducer = combineReducers({
  capsule: capsuleReducer
});

export default profileRootReducer;
