import objectAssign from 'object-assign';
import * as actionTypes from '../constants/app';

export const initialState = {
  currentUser: null
};

export default function appReducer(state = initialState, action = {}) {
  let {type} = action;

  switch (type) {
    case actionTypes.APP_LOGOUT:
      return objectAssign({}, state, {
        currentUser: null
      });

    default:
      return state;
  }
}
