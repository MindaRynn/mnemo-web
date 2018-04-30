import * as types from '../../constants/feed/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

function fetchingTimeCapsule() {
  return {type: types.TIME_CAPSULE_IS_FETCHING};
}

function timeCapsuleFetchSuccess(timeCapsules) {
  return {type: types.TIME_CAPSULE_FETCH_SUCCESS, timeCapsules: timeCapsules};
}

function timeCapsuleFetchFailure() {
  return {type: types.TIME_CAPSULE_FETCH_FAILURE};
}

function creatingTimeCapsule() {
  return {type: types.TIME_CAPSULE_IS_CREATING};
}

function timeCapsuleCreateSuccess(timeCapsule) {
  return {type: types.TIME_CAPSULE_CREATE_SUCCESS, timeCapsule: timeCapsule};
}

function timeCapsuleCreateFailure() {
  return {type: types.TIME_CAPSULE_CREATE_FAILURE};
}

function deletingTimeCapsule() {
  return {type: types.DELETING_TIME_CAPSULE};
}

function timeCapsuleDeleteSuccess(timeCapsule_id) {
  return {type: types.DELETE_TIME_CAPSULE_SUCCESS, deleted_timeCapsule_id: timeCapsule_id};
}

function timeCapsuleDeleteFailure() {
  return {type: types.DELETE_TIME_CAPSULE_FAILURE};
}

function fetch() {
  return TimeCapsulesAdapter
    .fetch()
    .then((response) => {
      return response;
    })
}

function create(userId, timeCapsuleDetail) {
  return TimeCapsulesAdapter
    .create(userId, timeCapsuleDetail)
    .then((response) => {
      return response;
    })
}

function deleting(timeCapsuleId) {
  return TimeCapsulesAdapter
    .delete(timeCapsuleId)
    .then((response) => {
      return response;
    })
}

export function fetchTimeCapsule() {
  return function (dispatch) {

    dispatch(fetchingTimeCapsule());
    fetch()
      .then((response) => {
        dispatch(timeCapsuleFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleFetchFailure());
      });
  };
}

export function createTimeCapsule(userId, timeCapsuleDetail) {
  return function (dispatch) {

    dispatch(creatingTimeCapsule());
    create(userId, timeCapsuleDetail)
      .then((response) => {
        dispatch(timeCapsuleCreateSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleCreateFailure());
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
  }
}

export function deleteTimeCapsule(timeCapsuleId) {
  return function (dispatch) {

    dispatch(deletingTimeCapsule());
    deleting(timeCapsuleId)
      .then((response) => {
        dispatch(timeCapsuleDeleteSuccess(response.time_capsule_id));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleDeleteFailure());
      });
  }
}
