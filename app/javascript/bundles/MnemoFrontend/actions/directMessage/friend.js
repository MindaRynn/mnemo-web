import * as types from '../../constants/directMessage/friend';
import FriendsAdapter from '../../adapters/friends';
import {appErrorHandler} from '../app';

export function fetchingUserFriend() {
  return {type: types.DIRECT_MESSAGE_IS_FETCHING};
}

export function userFriendFetchSuccess(friends) {
  return {type: types.DIRECT_MESSAGE_FETCH_SUCCESS, friends: friends};
}

export function userFriendFetchFailure() {
  return {type: types.DIRECT_MESSAGE_FETCH_FAILURE};
}

function fetch(userId, page = 1) {
  return FriendsAdapter
    .fetch(userId, page)
    .then((response) => {
      return response;
    })
}

export function fetchUserFriend(userId, page = 1) {
  return function (dispatch) {

    dispatch(fetchingUserFriend());
    fetch(userId, page)
      .then((response) => {
        dispatch(userFriendFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(userFriendFetchFailure());
      });
  };
}
