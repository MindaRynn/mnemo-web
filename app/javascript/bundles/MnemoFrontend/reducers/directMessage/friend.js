import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/directMessage/friend';

const initialState = {
  fetchingFriend: false,
  fetchFriendSuccess: false,
  fetchFriendFailure: false,

  friends: []
};

export default function userDirectMessageReducer(state = initialState, action = {}) {
  let { type, friends } = action;

  switch(type) {
    case actionTypes.DIRECT_MESSAGE_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingFriend: true
      });

    case actionTypes.DIRECT_MESSAGE_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingFriend: false,
        fetchFriendSuccess: true,
        fetchFriendFailure: false,
        friends: state.friends.concat(friends)
      });

    case actionTypes.DIRECT_MESSAGE_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingFriend: false,
        fetchFriendSuccess: false,
        fetchFriendFailure: true
      });

    default:
      return state;
  }
}

