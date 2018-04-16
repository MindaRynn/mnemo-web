import * as types from '../../constants/timeCapsule/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

function gettingTimeCapsule() {
  return {type: types.GET_TIME_CAPSULE_FAILURE};
}

function timeCapsuleGetSuccess(timeCapsule) {
  return {type: types.GET_TIME_CAPSULE_SUCCESS, timeCapsule: timeCapsule};
}

function timeCapsuleGetFailure() {
  return {type: types.GET_TIME_CAPSULE_FAILURE};
}


function get(timeCapsuleId) {
  return TimeCapsulesAdapter
    .get(timeCapsuleId)
    .then((response) => {
      return response;
    })
}

export function getTimeCapsule(timeCapsuleId) {
  return function (dispatch) {

    dispatch(gettingTimeCapsule());
    get(timeCapsuleId)
      .then((response) => {
        dispatch(timeCapsuleGetSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleGetFailure());
      });
  };
}