import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/feed/timeCapsule';

const initialState = {
  fetchingTimeCapsule: false,
  fetchTimeCapsuleSuccess: false,
  fetchTimeCapsuleFailure: false,

  creatingTimeCapsule: false,
  createTimeCapsuleSuccess: false,
  createTimeCapsuleFailure: false,

  deletingTimeCapsule: false,
  deleteTimeCapsuleSuccess: false,
  deleteTimeCapsuleFailure: false,

  timeCapsules: [],
  allTimeCapsules: []
};

export default function timeCapsuleReducer(state = initialState, action = {}) {
  let { type, timeCapsules, timeCapsule, deleted_timeCapsule_id, tags } = action;

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
        timeCapsules: state.timeCapsules.concat(timeCapsules),
        allTimeCapsules: state.timeCapsules.concat(timeCapsules)
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
        timeCapsules: [timeCapsule].concat(state.timeCapsules)
      });

    case actionTypes.TIME_CAPSULE_CREATE_FAILURE:
      return objectAssign({}, state, {
        creatingTimeCapsule: false,
        createTimeCapsuleSuccess: false,
        createTimeCapsuleFailure: true
      });

// ------------------------------------------------------------

    case actionTypes.DELETING_TIME_CAPSULE:
      return objectAssign({}, state, {
        deletingTimeCapsule: true,
        deleteTimeCapsuleSuccess: false,
        deleteTimeCapsuleFailure: false
      });

    case actionTypes.DELETE_TIME_CAPSULE_SUCCESS:
      return objectAssign({}, state, {
        deletingTimeCapsule: false,
        deleteTimeCapsuleSuccess: true,
        deleteTimeCapsuleFailure: false,
        timeCapsules: state.timeCapsules.filter(timeCapsule => timeCapsule.id != parseInt(deleted_timeCapsule_id))
      });


    case actionTypes.FILETER_BY_TAGS:
      return objectAssign({}, state, {
        timeCapsules: state.allTimeCapsules.filter(timeCapsule => tags.includes(timeCapsule.tag_name))
      });

    default:
      return state;
  }
}

