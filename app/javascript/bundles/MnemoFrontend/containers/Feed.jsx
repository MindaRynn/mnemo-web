import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseContainer from './Base';
import FeedScreen from '../screens/feed/';

import {feedActions} from '../actions/feed/';

class Feed extends BaseContainer {
  static displayName = 'Feed';

  render() {

    return (
      <FeedScreen {...this.props} />
    );
  }
}

Feed.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};


Feed.propTypes = {
  /**
   * Holds the available action creators.
   * */
  actions: PropTypes.object.isRequired,
  /**
   * Holds the profile store
   * */
  feed: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  let {feed} = state;

  return {
    feed
  };
}

function mapDispatchToProps(dispatch) {
  let actions = {
    ...feedActions
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);