import objectAssign from 'object-assign';
import * as actionTypes from '../constants/app';

export const initialState = {
  currentUser: null,
  errorStatus: null
};

export default function appReducer(state = initialState, action = {}) {
  let {type} = action;

  switch (type) {
    case actionTypes.APP_SHOW_ERROR:
      return objectAssign({}, state, {
        errorStatus: errorStatus
      });

    case actionTypes.APP_RESET_ERROR:
      return objectAssign({}, state, {
        errorStatus: null
      });

    case actionTypes.APP_LOGOUT:
      return objectAssign({}, state, {
        currentUser: null
      });

    default:
      return state;
  }
}
