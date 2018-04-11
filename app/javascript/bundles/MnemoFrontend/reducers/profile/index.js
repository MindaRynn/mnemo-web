import { combineReducers } from 'redux';

import capsuleReducer from './capsule';
// import roomReducer from './room';

const profileRootReducer = combineReducers({
  capsule: capsuleReducer
  // room: roomReducer
});

export default profileRootReducer;
