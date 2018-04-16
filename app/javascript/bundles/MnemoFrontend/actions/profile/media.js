import * as types from '../../constants/profile/media';

function addMediaToReducer(media) {
  return {type: types.MEDIA_ADDED, media: media};
}

function resetMediumInReducer() {
  return {type: types.RESET_MEDIUM};
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
