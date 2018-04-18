import * as types from '../../constants/feed/media';

function addMediaToReducer(media) {
  return {type: types.MEDIA_ADDED, media: media};
}

function resetMediumInReducer() {
  return {type: types.RESET_MEDIUM};
}

function deleteMediaFromReducer(deletedMediaIndex) {
  return {type: types.DELETE_MEDIA, deletedMediaIndex: deletedMediaIndex};
}

export function addMedia(mediaUrl) {
  return function (dispatch) {

    dispatch(addMediaToReducer(mediaUrl));
  };
}

export function resetMedium() {
  return function (dispatch) {

    dispatch(resetMediumInReducer());
  };
}

export function deleteMedia(deletedMediaIndex) {
  return function (dispatch) {

    dispatch(deleteMediaFromReducer(deletedMediaIndex));
  };
}
