import { combineReducers } from 'redux';

import friendReducer from './friend';
import roomReducer from './room';

const directMessageRootReducer = combineReducers({
  friend: friendReducer,
  room: roomReducer
});

export default directMessageRootReducer;
