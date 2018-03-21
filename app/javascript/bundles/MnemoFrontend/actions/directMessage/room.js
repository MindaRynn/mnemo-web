import * as types from '../../constants/directMessage/room';
import RoomsAdapter from '../../adapters/rooms';
import {appErrorHandler} from '../app';

export function fetchingUserRoom() {
  return {type: types.ROOM_IS_FETCHING};
}

export function userRoomFetchSuccess(rooms) {
  return {type: types.ROOM_FETCH_SUCCESS, rooms: rooms};
}

export function userRoomFetchFailure() {
  return {type: types.ROOM_FETCH_FAILURE};
}

function fetch(userId) {
  return RoomsAdapter
    .fetch(userId)
    .then((response) => {
      return response;
    })
}

export function fetchUserRoom(userId) {
  return function (dispatch) {
    dispatch(fetchingUserRoom());
    fetch(userId)
      .then((response) => {
        dispatch(userRoomFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(userRoomFetchFailure());
      });
  };
}
