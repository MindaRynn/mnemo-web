import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/profile/user'

const initialState = {
  gettingUser: false,
  getUserSuccess: false,
  getUserFailure: false,

  user: {}
};

export default function tagReducer(state = initialState, action = {}) {
  let { type, user } = action;

  switch(type) {
    case actionTypes.USER_IS_GETTING:
      return objectAssign({}, state, {
        gettingUser: true,
        getUserSuccess: false,
        getUserFailure: false,
      });

    case actionTypes.USER_GET_SUCCESS:
      return objectAssign({}, state, {
        gettingUser: false,
        getUserSuccess: true,
        getUserFailure: false,
        user: user
      });

    case actionTypes.USER_GET_FAILURE:
      return objectAssign({}, state, {
        gettingUser: false,
        getUserSuccess: false,
        getUserFailure: true,
      });

    default:
      return state;
  }
}
