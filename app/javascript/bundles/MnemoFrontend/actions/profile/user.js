import * as types from '../../constants/profile/user';
import UsersAdapter from '../../adapters/users';
import {appErrorHandler} from '../app';

function gettingUser() {
  return {type: types.USER_IS_GETTING};
}

function userGetSuccess(user) {
  return {type: types.USER_GET_SUCCESS, user: user};
}

function userGetFailure() {
  return {type: types.USER_GET_FAILURE};
}

function fetchingUser() {
  return {type: types.USER_IS_FETCHING};
}

function userFetchSuccess(users) {
  return {type: types.USER_FETCH_SUCCESS, users: users};
}

function userFetchFailure() {
  return {type: types.USER_FETCH_FAILURE};
}

function get(userId) {
  return UsersAdapter
    .get(userId)
    .then((response) => {
      return response;
    })
}

function fetch() {
  return UsersAdapter
    .fetch()
    .then((response) => {
      return response;
    })
}

export function getUser(userId) {
  return function (dispatch) {
    dispatch(gettingUser());
    get(userId)
      .then((response) => {
        dispatch(userGetSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(userGetFailure());
      });
  };
}

export function fetchUser(currentUserId) {
  return function (dispatch) {
    dispatch(fetchingUser());
    fetch()
      .then((response) => {
        let allUsers = response.filter(function(value, arrIndex) {return value.id !== currentUserId})
        dispatch(userFetchSuccess(allUsers));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(userFetchFailure());
      });
  };
}
