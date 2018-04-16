import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/timeCapsule/timeCapsule';

const initialState = {
  gettingTimeCapsule: false,
  getTimeCapsuleSuccess: false,
  getTimeCapsuleFailure: false,

  timeCapsule: {}
};

export default function timeCapsuleReducer(state = initialState, action = {}) {
  let { type, timeCapsule } = action;

  switch(type) {
    case actionTypes.GETTING_TIME_CAPSULE:
      return objectAssign({}, state, {
        gettingTimeCapsule: true,
        getTimeCapsuleSuccess: false,
        getTimeCapsuleFailure: false
      });

    case actionTypes.GET_TIME_CAPSULE_SUCCESS:
      return objectAssign({}, state, {
        gettingTimeCapsule: false,
        getTimeCapsuleSuccess: true,
        getTimeCapsuleFailure: false,
        timeCapsule: timeCapsule
      });

    case actionTypes.GET_TIME_CAPSULE_FAILURE:
      return objectAssign({}, state, {
        gettingTimeCapsule: false,
        getTimeCapsuleSuccess: false,
        getTimeCapsuleFailure: true
      });

    default:
      return state;
  }
}

