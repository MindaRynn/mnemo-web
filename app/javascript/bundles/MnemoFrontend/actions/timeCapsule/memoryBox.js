import * as types from '../../constants/timeCapsule/memoryBox';
import MemoryBoxesAdapter from '../../adapters/memoryBoxes';
import {appErrorHandler} from '../app';

function creatingMemoryBox() {
  return {type: types.MEMORY_BOX_IS_CREATING};
}

function memoryBoxCreateSuccess(memoryBox) {
  return {type: types.MEMORY_BOX_CREATE_SUCCESS, memoryBox: memoryBox};
}

function memoryBoxCreateFailure() {
  return {type: types.MEMORY_BOX_CREATE_FAILURE};
}

function create(userId, memoryBoxDetail) {
  return MemoryBoxesAdapter
    .create(userId, memoryBoxDetail)
    .then((response) => {
      return response;
    })
}

export function createMemoryBox(userId, memoryBoxDetail) {
  return function (dispatch) {

    dispatch(creatingMemoryBox());
    create(userId, memoryBoxDetail)
      .then((response) => {
        dispatch(memoryBoxCreateSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(memoryBoxCreateFailure());
      });
  };
}
