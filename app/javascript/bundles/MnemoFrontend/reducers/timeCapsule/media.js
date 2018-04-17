import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/timeCapsule/media';

const initialState = {
  medium: []
};

export default function mediaReducer(state = initialState, action = {}) {
  let { type, media } = action;

  switch(type) {
    case actionTypes.MEDIA_ADDED:
      return objectAssign({}, state, {
        medium: state.medium.concat(media)
      });

    case actionTypes.RESET_MEDIUM:
      return objectAssign({}, state, {
        medium: []
      });

    default:
      return state;
  }
}

