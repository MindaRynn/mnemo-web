import * as types from '../../constants/feed/media';

function addMediaToReducer(media) {
  return {type: types.MEDIA_ADDED, media: media};
}

export function addMedia(mediaUrl) {
  return function (dispatch) {

    dispatch(addMediaToReducer(mediaUrl));
  };
}
