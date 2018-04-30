import * as types from '../../constants/timeCapsule/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

function gettingTimeCapsule() {
  return {type: types.GETTING_TIME_CAPSULE};
}

function timeCapsuleGetSuccess(timeCapsule) {
  return {type: types.GET_TIME_CAPSULE_SUCCESS, timeCapsule: timeCapsule};
}

function timeCapsuleGetFailure() {
  return {type: types.GET_TIME_CAPSULE_FAILURE};
}


function updatingTimeCapsule() {
  return {type: types.UPDATING_TIME_CAPSULE};
}

function timeCapsuleUpdateSuccess(timeCapsule) {
  return {type: types.UPDATE_TIME_CAPSULE_SUCCESS, timeCapsule: timeCapsule};
}

function timeCapsuleUpdateFailure() {
  return {type: types.UPDATE_TIME_CAPSULE_FAILURE};
}

//----------------------------------------


function get(timeCapsuleId) {
  return TimeCapsulesAdapter
    .get(timeCapsuleId)
    .then((response) => {
      return response;
    })
}

function update(timeCapsuleId, timeCapsuleDetail) {
  return TimeCapsulesAdapter
    .update(timeCapsuleId, timeCapsuleDetail)
    .then((response) => {
      return response;
    })
}

//----------------------------------------

export function getTimeCapsule(timeCapsuleId) {
  return function (dispatch) {

    dispatch(gettingTimeCapsule());
    get(timeCapsuleId)
      .then((response) => {
        dispatch(timeCapsuleGetSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleGetFailure());
      });
  };
}

export function updateTimeCapsule(timeCapsuleId, timeCapsuleDetail) {
  return function (dispatch) {

    dispatch(updatingTimeCapsule());
    update(timeCapsuleId, timeCapsuleDetail)
      .then((response) => {
        dispatch(timeCapsuleUpdateSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleUpdateFailure());
      });
  };
}

export function openTimeCapsule(timeCapsuleId) {
  return function (dispatch) {

    TimeCapsulesAdapter
      .open(timeCapsuleId)
      .then((response) => {
        return response;
      })
  };
}