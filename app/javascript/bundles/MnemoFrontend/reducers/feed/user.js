import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/feed/user'

const initialState = {
  fetchingUser: false,
  fetchUserSuccess: false,
  fetchUserFailure: false,

  users: []
};

export default function tagReducer(state = initialState, action = {}) {
  let { type, users } = action;

  switch(type) {
    case actionTypes.USER_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingUser: true,
        fetchUserSuccess: false,
        fetchUserFailure: false
      });

    case actionTypes.USER_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingUser: false,
        fetchUserSuccess: true,
        fetchUserFailure: false,
        users: users
      });

    case actionTypes.USER_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingUser: false,
        fetchUserSuccess: false,
        fetchUserFailure: true,
      });

    default:
      return state;
  }
}
