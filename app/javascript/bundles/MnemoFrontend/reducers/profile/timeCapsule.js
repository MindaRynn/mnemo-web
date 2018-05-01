import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/profile/timeCapsule';

const initialState = {
  fetchingTimeCapsule: false,
  fetchTimeCapsuleSuccess: false,
  fetchTimeCapsuleFailure: false,

  fetchingParticipatedTimeCapsule: false,
  ParticipatedTimeCapsuleFetchSuccess: false,
  ParticipatedTimeCapsuleFetchFailure: false,

  fetchingGiftedTimeCapsule: false,
  giftedTimeCapsuleFetchSuccess: false,
  giftedTimeCapsuleFetchFailure: false,

  creatingTimeCapsule: false,
  createTimeCapsuleSuccess: false,
  createTimeCapsuleFailure: false,

  deletingTimeCapsule: false,
  deleteTimeCapsuleSuccess: false,
  deleteTimeCapsuleFailure: false,

  userTimeCapsules: [],
  participatedTimeCapsules: [],
  giftedTimeCapsules: []
};

export default function timeCapsuleReducer(state = initialState, action = {}) {
  let { type, userTimeCapsules, userTimeCapsule, participatedTimeCapsules, giftedTimeCapsules, deleted_timeCapsule_id } = action;

  switch(type) {
    case actionTypes.USER_TIME_CAPSULE_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingTimeCapsule: true,
        fetchTimeCapsuleSuccess: false,
        fetchTimeCapsuleFailure: false
      });

    case actionTypes.USER_TIME_CAPSULE_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingTimeCapsule: false,
        fetchTimeCapsuleSuccess: true,
        fetchTimeCapsuleFailure: false,
        userTimeCapsules: state.userTimeCapsules.concat(userTimeCapsules)
      });

    case actionTypes.USER_TIME_CAPSULE_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingTimeCapsule: false,
        fetchTimeCapsuleSuccess: false,
        fetchTimeCapsuleFailure: true
      });

    case actionTypes.PATICIPATED_TIME_CAPSULE_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingParticipatedTimeCapsule: true,
        ParticipatedTimeCapsuleFetchSuccess: false,
        ParticipatedTimeCapsuleFetchFailure: false
    });

    case actionTypes.PATICIPATED_TIME_CAPSULE_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingParticipatedTimeCapsule: false,
        ParticipatedTimeCapsuleFetchSuccess: true,
        ParticipatedTimeCapsuleFetchFailure: false,
        participatedTimeCapsules: state.participatedTimeCapsules.concat(participatedTimeCapsules)
    });

    case actionTypes.PATICIPATED_TIME_CAPSULE_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingParticipatedTimeCapsule: false,
        ParticipatedTimeCapsuleFetchSuccess: false,
        ParticipatedTimeCapsuleFetchFailure: true,
    });

    case actionTypes.GIFTED_TIME_CAPSULE_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingParticipatedTimeCapsule: true,
        ParticipatedTimeCapsuleFetchSuccess: false,
        ParticipatedTimeCapsuleFetchFailure: false
      });

    case actionTypes.GIFTED_TIME_CAPSULE_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingGiftedTimeCapsule: false,
        giftedTimeCapsuleFetchSuccess: true,
        giftedTimeCapsuleFetchFailure: false,
        giftedTimeCapsules: state.giftedTimeCapsules.concat(giftedTimeCapsules)
      });

    case actionTypes.GIFTED_TIME_CAPSULE_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingGiftedTimeCapsule: false,
        giftedTimeCapsuleFetchSuccess: false,
        giftedTimeCapsuleFetchFailure: true,
      });

// ------------------------------------------------------------

    case actionTypes.TIME_CAPSULE_IS_CREATING:
      return objectAssign({}, state, {
        creatingTimeCapsule: true,
        createTimeCapsuleSuccess: false,
        createTimeCapsuleFailure: false,
      });

    case actionTypes.TIME_CAPSULE_CREATE_SUCCESS:
      return objectAssign({}, state, {
        creatingTimeCapsule: false,
        createTimeCapsuleSuccess: true,
        createTimeCapsuleFailure: false,
        userTimeCapsules: state.userTimeCapsules.concat(userTimeCapsule)
      });

    case actionTypes.TIME_CAPSULE_CREATE_FAILURE:
      return objectAssign({}, state, {
        creatingTimeCapsule: false,
        createTimeCapsuleSuccess: false,
        createTimeCapsuleFailure: true,
      });
//----------------------------------------------

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
        userTimeCapsules: state.userTimeCapsules.filter(userTimeCapsule => userTimeCapsule.id != parseInt(deleted_timeCapsule_id)),
        participatedTimeCapsules: state.participatedTimeCapsules.filter(participatedTimeCapsule => participatedTimeCapsule.id != parseInt(deleted_timeCapsule_id))
      });

    case actionTypes.DELETE_TIME_CAPSULE_FAILURE:
      return objectAssign({}, state, {
        deletingTimeCapsule: false,
        deleteTimeCapsuleSuccess: false,
        deleteTimeCapsuleFailure: true
      });

//----------------------------------------------

    default:
      return state;
  }
}


