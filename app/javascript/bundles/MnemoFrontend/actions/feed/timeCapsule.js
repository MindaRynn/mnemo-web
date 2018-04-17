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

function fetch(userId) {
  return TimeCapsulesAdapter
    .fetch({user_id: userId})
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

export function fetchTimeCapsule(userId) {
  return function (dispatch) {

    dispatch(fetchingTimeCapsule());
    fetch(userId)
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
