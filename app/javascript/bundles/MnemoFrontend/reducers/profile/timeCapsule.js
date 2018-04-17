import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/profile/timeCapsule';

const initialState = {
  fetchingTimeCapsule: false,
  fetchTimeCapsuleSuccess: false,
  fetchTimeCapsuleFailure: false,

  creatingTimeCapsule: false,
  createTimeCapsuleSuccess: false,
  createTimeCapsuleFailure: false,

  // timeCapsules: [],
  userTimeCapsules: [],
  // participatedTimeCapsules: []
};

export default function timeCapsuleReducer(state = initialState, action = {}) {
  let { type, timeCapsules, timeCapsule, userTimeCapsules, userTimeCapsule, participatedTimeCapsules, participatedTimeCapsule } = action;

  switch(type) {
    case actionTypes.TIME_CAPSULE_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingTimeCapsule: true,
        fetchTimeCapsuleSuccess: false,
        fetchTimeCapsuleFailure: false
      });

    case actionTypes.TIME_CAPSULE_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingTimeCapsule: false,
        fetchTimeCapsuleSuccess: true,
        fetchTimeCapsuleFailure: false,
        // participatedTimeCapsules: state.participatedTimeCapsules.concat(participatedTimeCapsules),
        userTimeCapsules: state.userTimeCapsules.concat(userTimeCapsules),
        // timeCapsules: state.timeCapsules.concat(timeCapsules)
      });

    case actionTypes.TIME_CAPSULE_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingTimeCapsule: false,
        fetchTimeCapsuleSuccess: false,
        fetchTimeCapsuleFailure: true
      });

// ------------------------------------------------------------

    case actionTypes.TIME_CAPSULE_IS_CREATING:
      return objectAssign({}, state, {
        creatingTimeCapsule: true,
        createTimeCapsuleSuccess: false,
        createTimeCapsuleFailure: false
      });

    case actionTypes.TIME_CAPSULE_CREATE_SUCCESS:
      return objectAssign({}, state, {
        creatingTimeCapsule: false,
        createTimeCapsuleSuccess: true,
        createTimeCapsuleFailure: false,
        // participatedTimeCapsules: state.participatedTimeCapsules.concat(participatedTimeCapsule),
        userTimeCapsules: state.userTimeCapsules.concat(userTimeCapsule),
        // timeCapsules: state.timeCapsules.concat(timeCapsule)
      });

    case actionTypes.TIME_CAPSULE_CREATE_FAILURE:
      return objectAssign({}, state, {
        creatingTimeCapsule: false,
        createTimeCapsuleSuccess: false,
        createTimeCapsuleFailure: true
      });

    default:
      return state;
  }
}


