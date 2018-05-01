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

function get(userId) {
  return UsersAdapter
    .get(userId)
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
