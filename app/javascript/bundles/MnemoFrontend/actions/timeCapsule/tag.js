import * as types from '../../constants/timeCapsule/tag';
import TagsAdapter from '../../adapters/tags';
import {appErrorHandler} from '../app';

function fetchingTag() {
  return {type: types.TAG_IS_FETCHING};
}

function tagFetchSuccess(tags) {
  return {type: types.TAG_FETCH_SUCCESS, tags: tags};
}

function tagFetchFailure() {
  return {type: types.TAG_FETCH_FAILURE};
}

function fetch() {
  return TagsAdapter
    .fetch()
    .then((response) => {
      return response;
    })
}

export function fetchTags() {
  return function (dispatch) {

    dispatch(fetchingTag());
    fetch()
      .then((response) => {
        dispatch(tagFetchSuccess(response));
      })
      .catch(errors => {
        dispatch(appErrorHandler(errors));
        dispatch(userFriendFetchFailure());
      });
  };
}
