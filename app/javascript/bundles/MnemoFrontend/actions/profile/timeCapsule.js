import * as types from '../../constants/profile/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

export function fetchingUserTimeCapsule() {
  return {type: types.USER_TIME_CAPSULE_IS_FETCHING};
}

export function UsertimeCapsuleFetchSuccess(userTimeCapsules) {
  return {type: types.USER_TIME_CAPSULE_FETCH_SUCCESS, userTimeCapsules: userTimeCapsules};
}

export function UsertimeCapsuleFetchFailure() {
  return {type: types.USER_TIME_CAPSULE_FETCH_FAILURE};
}

export function fetchingParticipatedTimeCapsule() {
  return {type: types.PATICIPATED_TIME_CAPSULE_IS_FETCHING};
}

export function ParticipatedTimeCapsuleFetchSuccess(participatedTimeCapsules) {
  return {type: types.PATICIPATED_TIME_CAPSULE_FETCH_SUCCESS, participatedTimeCapsules: participatedTimeCapsules};
}

export function ParticipatedTimeCapsuleFetchFailure() {
  return {type: types.PATICIPATED_TIME_CAPSULE_FETCH_FAILURE};
}

//-------------------------------------------------------

function creatingTimeCapsule() {
  return {type: types.TIME_CAPSULE_IS_CREATING};
}

function timeCapsuleCreateSuccess(timeCapsule) {
  return {type: types.TIME_CAPSULE_CREATE_SUCCESS, timeCapsule: timeCapsule};
}

function timeCapsuleCreateFailure() {
  return {type: types.TIME_CAPSULE_CREATE_FAILURE};
}

//-------------------------------------------------------

function fetch(currentId) {
  return TimeCapsulesAdapter
    .fetch({user_id: currentId})
    .then((response) => {
      return response;
    })
}

function create(userId, timeCapsuleDetail, participated) {
  return TimeCapsulesAdapter
    .create(userId, timeCapsuleDetail, participated)
    .then((response) => {
      return response;
    })
}

function fetchParticipated() {
  return TimeCapsulesAdapter
    .fetch({participated: 1})
    .then((response) => {
      return response;
    })
}

//-------------------------------------------------------

export function fetchUserTimeCapsule(currentId) {
  return function (dispatch) {

    dispatch(fetchingUserTimeCapsule());
    fetch(currentId)
      .then((response) => {
        dispatch(UsertimeCapsuleFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(UsertimeCapsuleFetchFailure());
      });
  };
}

export function fetchParticipatedTimeCapsule() {
  return function (dispatch) {

    dispatch(fetchingParticipatedTimeCapsule());
    fetchParticipated()
      .then((response) => {
        dispatch(ParticipatedTimeCapsuleFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(ParticipatedTimeCapsuleFetchFailure());
      });
  };
}

export function createTimeCapsule(userId, timeCapsuleDetail, participated) {
  return function (dispatch) {

    dispatch(creatingTimeCapsule());
    create(userId, timeCapsuleDetail, participated)
      .then((response) => {
        dispatch(timeCapsuleCreateSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleCreateFailure());
      });
  };
}

