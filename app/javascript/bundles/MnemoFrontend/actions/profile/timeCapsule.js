import * as types from '../../constants/profile/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

function fetchingUserTimeCapsule() {
  return {type: types.USER_TIME_CAPSULE_IS_FETCHING};
}

function UsertimeCapsuleFetchSuccess(userTimeCapsules) {
  return {type: types.USER_TIME_CAPSULE_FETCH_SUCCESS, userTimeCapsules: userTimeCapsules};
}

function UsertimeCapsuleFetchFailure() {
  return {type: types.USER_TIME_CAPSULE_FETCH_FAILURE};
}

function fetchingParticipatedTimeCapsule() {
  return {type: types.PATICIPATED_TIME_CAPSULE_IS_FETCHING};
}

function ParticipatedTimeCapsuleFetchSuccess(participatedTimeCapsules) {
  return {type: types.PATICIPATED_TIME_CAPSULE_FETCH_SUCCESS, participatedTimeCapsules: participatedTimeCapsules};
}

function ParticipatedTimeCapsuleFetchFailure() {
  return {type: types.PATICIPATED_TIME_CAPSULE_FETCH_FAILURE};
}

function fetchingGiftedTimeCapsule() {
  return {type: types.GIFTED_TIME_CAPSULE_IS_FETCHING};
}

function giftedTimeCapsuleFetchSuccess(giftedTimeCapsules) {
  return {type: types.GIFTED_TIME_CAPSULE_FETCH_SUCCESS, giftedTimeCapsules: giftedTimeCapsules};
}

function giftedTimeCapsuleFetchFailure() {
  return {type: types.GIFTED_TIME_CAPSULE_FETCH_FAILURE};
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

function deletingTimeCapsule() {
  return {type: types.DELETING_TIME_CAPSULE};
}

function timeCapsuleDeleteSuccess(timeCapsule_id) {
  return {type: types.DELETE_TIME_CAPSULE_SUCCESS, deleted_timeCapsule_id: timeCapsule_id};
}

function timeCapsuleDeleteFailure() {
  return {type: types.DELETE_TIME_CAPSULE_FAILURE};
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

function fetchGifted() {
  return TimeCapsulesAdapter
    .fetch({gifted: 1})
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

export function fetchGiftedTimeCapsule() {
  return function (dispatch) {

    dispatch(fetchingGiftedTimeCapsule());
    fetchGifted()
      .then((response) => {
        dispatch(giftedTimeCapsuleFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(giftedTimeCapsuleFetchFailure());
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

export function openTimeCapsule(timeCapsuleId) {
  return function (dispatch) {

    TimeCapsulesAdapter
      .open(timeCapsuleId)
      .then((response) => {
        return response;
      })
  };
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
  };
}
