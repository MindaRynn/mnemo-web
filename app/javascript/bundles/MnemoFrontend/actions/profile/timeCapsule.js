import * as types from '../../constants/profile/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

export function fetchingUserTimeCapsule() {
  return {type: types.TIME_CAPSULE_IS_FETCHING};
}

export function UsertimeCapsuleFetchSuccess(userTimeCapsules) {
  return {type: types.TIME_CAPSULE_FETCH_SUCCESS, userTimeCapsules: userTimeCapsules};
}

export function UsertimeCapsuleFetchFailure() {
  return {type: types.TIME_CAPSULE_FETCH_FAILURE};
}

//-------------------------------------------------------

function creatingTimeCapsule() {
  return {type: types.TIME_CAPSULE_IS_CREATING};
}

function timeCapsuleCreateSuccess(userTimeCapsule) {
  return {type: types.TIME_CAPSULE_CREATE_SUCCESS, userTimeCapsule: userTimeCapsule};
}

function timeCapsuleCreateFailure() {
  return {type: types.TIME_CAPSULE_CREATE_FAILURE};
}

//-------------------------------------------------------

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

//-------------------------------------------------------

export function fetchTimeCapsule(userId) {
  return function (dispatch) {

    dispatch(fetchingUserTimeCapsule());
    fetch(userId)
      .then((response) => {
        dispatch(UsertimeCapsuleFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(UsertimeCapsuleFetchFailure());
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

