import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/directMessage/room';

const initialState = {
  fetchingRoom: false,
  fetchRoomSuccess: false,
  fetchRoomFailure: false,

  gettingRoom: false,
  getRoomSuccess: false,
  getRoomFailure: false,

  savingRoom: false,
  roomSaveSuccess: false,
  roomSaveFailure: false,

  rooms: [],
  room: {}
};

export default function userRoomReducer(state = initialState, action = {}) {
  let { type, rooms } = action;

  switch(type) {
    case actionTypes.ROOM_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingRoom: true
      });

    case actionTypes.ROOM_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingRoom: false,
        fetchRoomSuccess: true,
        fetchRoomFailure: false,
        rooms: state.rooms.concat(rooms)
      });

    case actionTypes.ROOM_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingRoom: false,
        fetchRoomSuccess: false,
        fetchRoomFailure: true
      });

    case actionTypes.GETTING_ROOM:
      return objectAssign({}, state, {
        gettingRoom: true
      });

    case actionTypes.GET_ROOM_SUCCESS:
      return objectAssign({}, state, {
        gettingRoom: false,
        getRoomSuccess: true,
        getRoomFailure: false,
        room: state.room
      });

    case actionTypes.GET_ROOM_FAILURE:
      return objectAssign({}, state, {
        gettingRoom: false,
        getRoomSuccess: false,
        getRoomFailure: true
      });

    case actionTypes.ROOM_IS_SAVING:
      return objectAssign({}, state, {
        savingRoom: true,
        roomSaveSuccess: false,
        roomSaveFailure: false
      });

    case actionTypes.ROOM_SAVE_SUCCESS:
      return objectAssign({}, state, {
        savingRoom: false,
        roomSaveSuccess: true,
        roomSaveFailure: false,
        rooms: [...state.rooms, room.data],
      });

    case actionTypes.ROOM_SAVE_FAILURE:
      return objectAssign({}, state, {
        savingComment: false,
        commentSaveSuccess: false,
        commentSaveFailure: true
      });

    default:
      return state;
  }
}

function createNewRoom() {

}