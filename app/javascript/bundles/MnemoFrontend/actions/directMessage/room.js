import * as types from '../../constants/directMessage/room';
import RoomsAdapter from '../../adapters/rooms';
import {appErrorHandler} from '../app';

export function fetchingRoom() {
  return {type: types.ROOM_IS_FETCHING};
}

export function roomFetchSuccess(rooms) {
  return {type: types.ROOM_FETCH_SUCCESS, rooms: rooms};
}

export function roomFetchFailure() {
  return {type: types.ROOM_FETCH_FAILURE};
}


export function gettingRoom() {
  return {type: types.GETTING_ROOM};
}

export function getRoomSuccess(room) {
  return {type: types.GET_ROOM_SUCCESS, room: room};
}

export function getRoomFailure() {
  return {type: types.GET_ROOM_FAILURE};
}


function roomIsSaving() {
  return {type: types.ROOM_IS_SAVING};
}

function roomSaveSuccess(room) {
  return {type: types.ROOM_SAVE_SUCCESS, room: room};
}

function roomSaveFailure() {
  return {type: types.ROOM_SAVE_FAILURE};
}


function fetch(userId) {
  return RoomsAdapter
    .fetch(userId)
    .then((response) => {
      return response;
    })
}

function get(friendId) {
  return RoomsAdapter
    .get(friendId)
    .then((response) => {
      return response;
    })
}

export function fetchRoom(userId) {
  return function (dispatch) {
    dispatch(fetchingRoom());
    fetch(userId)
      .then((response) => {
        dispatch(roomFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(roomFetchFailure());
      });
  };
}

export function getRoom(friendId) {
  return function (dispatch) {
    dispatch(fetchingRoom());
    get(friendId)
      .then((response) => {
        dispatch(roomFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(roomFetchFailure());
      });
  };
}

export function createRoom(users) {
  return function (dispatch) {
    dispatch(roomIsSaving());

    RoomsAdapter
      .create(users)
      .then(function (response) {
        dispatch(roomSaveSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(roomSaveFailure());
      });
  };
}
