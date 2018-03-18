import { combineReducers } from 'redux';

import friendReducer from './friend';

const directMessageRootReducer = combineReducers({
  friend: friendReducer
});

export default directMessageRootReducer;
