import { combineReducers } from 'redux';

import timeCapsuleReducer from './timeCapsule';
import mediaReducer from './media';

const feedRootReducer = combineReducers({
  timeCapsule: timeCapsuleReducer,
  media: mediaReducer
});

export default feedRootReducer;
