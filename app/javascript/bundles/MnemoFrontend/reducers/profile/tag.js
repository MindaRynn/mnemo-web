import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/profile/tag';

const initialState = {
  fetchingTag: false,
  fetchTagSuccess: false,
  fetchTagFailure: false,

  tags: []
};

export default function tagReducer(state = initialState, action = {}) {
  let { type, tags } = action;

  switch(type) {
    case actionTypes.TAG_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingTag: true,
        fetchTagSuccess: false,
        fetchTagFailure: false,
      });

    case actionTypes.TAG_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingTag: false,
        fetchTagSuccess: true,
        fetchTagFailure: false,
        tags: state.tags.concat(tags)
      });

    case actionTypes.TAG_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingTag: false,
        fetchTagSuccess: false,
        fetchTagFailure: true
      });

    default:
      return state;
  }
}
