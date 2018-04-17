import objectAssign from 'object-assign';
import * as timeCapsuleActionTypes from '../../constants/timeCapsule/timeCapsule';
import * as memoryBoxActionTypes from '../../constants/timeCapsule/memoryBox';

const initialState = {
  gettingTimeCapsule: false,
  getTimeCapsuleSuccess: false,
  getTimeCapsuleFailure: false,

  updatingTimeCapsule: false,
  updateTimeCapsuleSuccess: false,
  updateTimeCapsuleFailure: false,

  creatingMemoryBox: false,
  memoryBoxCreateSuccess: false,
  memoryBoxCreateFailure: false,

  timeCapsule: {},
  memoryBoxes: []
};

export default function timeCapsuleReducer(state = initialState, action = {}) {
  let { type, timeCapsule, memoryBox } = action;

  switch(type) {
    case timeCapsuleActionTypes.GETTING_TIME_CAPSULE:
      return objectAssign({}, state, {
        gettingTimeCapsule: true,
        getTimeCapsuleSuccess: false,
        getTimeCapsuleFailure: false
      });

    case timeCapsuleActionTypes.GET_TIME_CAPSULE_SUCCESS:
      return objectAssign({}, state, {
        gettingTimeCapsule: false,
        getTimeCapsuleSuccess: true,
        getTimeCapsuleFailure: false,
        timeCapsule: timeCapsule,
        memoryBoxes: timeCapsule.memory_boxes.slice(1,timeCapsule.memory_boxes.length)
      });

    case timeCapsuleActionTypes.GET_TIME_CAPSULE_FAILURE:
      return objectAssign({}, state, {
        gettingTimeCapsule: false,
        getTimeCapsuleSuccess: false,
        getTimeCapsuleFailure: true
      });

//----------------------------------------------

    case timeCapsuleActionTypes.UPDATING_TIME_CAPSULE:
      return objectAssign({}, state, {
        updatingTimeCapsule: true,
        updateTimeCapsuleSuccess: false,
        updateTimeCapsuleFailure: false
      });

    case timeCapsuleActionTypes.UPDATE_TIME_CAPSULE_SUCCESS:
      return objectAssign({}, state, {
        updatingTimeCapsule: false,
        updateTimeCapsuleSuccess: true,
        updateTimeCapsuleFailure: false,
        timeCapsule: timeCapsule
      });

    case timeCapsuleActionTypes.UPDATE_TIME_CAPSULE_FAILURE:
      return objectAssign({}, state, {
        updatingTimeCapsule: false,
        updateTimeCapsuleSuccess: false,
        updateTimeCapsuleFailure: true
      });

//----------------------------------------------
    case memoryBoxActionTypes.MEMORY_BOX_IS_CREATING:
      return objectAssign({}, state, {
        creatingMemoryBox: true,
        memoryBoxCreateSuccess: false,
        memoryBoxCreateFailure: false
      });

    case memoryBoxActionTypes.MEMORY_BOX_CREATE_SUCCESS:
      return objectAssign({}, state, {
        creatingMemoryBox: false,
        memoryBoxCreateSuccess: true,
        memoryBoxCreateFailure: false,
        memoryBoxes: state.memoryBoxes.concat(memoryBox)
      });

    case memoryBoxActionTypes.MEMORY_BOX_CREATE_FAILURE:
      return objectAssign({}, state, {
        creatingMemoryBox: false,
        memoryBoxCreateSuccess: false,
        memoryBoxCreateFailure: true
      });

//----------------------------------------------

    default:
      return state;
  }
}

