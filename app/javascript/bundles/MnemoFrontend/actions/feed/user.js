import * as types from '../../constants/feed/user';
import UsersAdapter from '../../adapters/users';
import {appErrorHandler} from '../app';

function fetchingUser() {
  return {type: types.USER_IS_FETCHING};
}

function userFetchSuccess(users) {
  return {type: types.USER_FETCH_SUCCESS, users: users};
}

function userFetchFailure() {
  return {type: types.USER_FETCH_FAILURE};
}

function fetch() {
  return UsersAdapter
    .fetch()
    .then((response) => {
      return response;
    })
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
