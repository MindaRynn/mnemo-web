import * as types from '../../constants/feed/timeCapsule';
import TimeCapsulesAdapter from '../../adapters/timeCapsules';
import {appErrorHandler} from '../app';

function fetchingTimeCapsule() {
  return {type: types.TIME_CAPSULE_IS_FETCHING};
}

function timeCapsuleFetchSuccess(timeCapsules) {
  return {type: types.TIME_CAPSULE_FETCH_SUCCESS, timeCapsules: timeCapsules};
}

function timeCapsuleFetchFailure() {
  return {type: types.TIME_CAPSULE_FETCH_FAILURE};
}

function fetch(userId) {
  return TimeCapsulesAdapter
    .fetch(userId)
    .then((response) => {
      return response;
    })
}

export function fetchTimeCapsule(userId) {
  return function (dispatch) {

    dispatch(fetchingTimeCapsule());
    fetch(userId)
      .then((response) => {
        dispatch(timeCapsuleFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(timeCapsuleFetchFailure());
      });
  };
}
