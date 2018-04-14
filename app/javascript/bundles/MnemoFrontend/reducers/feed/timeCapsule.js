import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/feed/timeCapsule';

const initialState = {
  fetchingTimeCapsule: false,
  fetchTimeCapsuleSuccess: false,
  fetchTimeCapsuleFailure: false,

  timeCapsules: []
};

export default function timeCapsuleReducer(state = initialState, action = {}) {
  let { type, timeCapsules } = action;

  switch(type) {
    case actionTypes.TIME_CAPSULE_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingTimeCapsule: true
      });

    case actionTypes.TIME_CAPSULE_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingTimeCapsule: false,
        fetchTimeCapsuleSuccess: true,
        fetchTimeCapsuleFailure: false,
        timeCapsules: state.timeCapsules.concat(timeCapsules)
      });

    case actionTypes.TIME_CAPSULE_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingTimeCapsule: false,
        fetchTimeCapsuleSuccess: false,
        fetchTimeCapsuleFailure: true
      });

    default:
      return state;
  }
}

