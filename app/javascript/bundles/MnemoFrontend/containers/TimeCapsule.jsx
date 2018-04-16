import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseContainer from './Base';
import TimeCapsuleScreen from '../screens/timeCapsule/';

import {timeCapsuleActions} from '../actions/timeCapsule/';

class TimeCapsule extends BaseContainer {
  static displayName = 'TimeCapsule';

  render() {

    return (
      <TimeCapsuleScreen {...this.props} />
    );
  }
}

TimeCapsule.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};


TimeCapsule.propTypes = {
  /**
   * Holds the available action creators.
   * */
  actions: PropTypes.object.isRequired,
  /**
   * Holds the profile store
   * */
  timeCapsule: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  let {timeCapsule} = state;

  return {
    timeCapsule
  };
}

function mapDispatchToProps(dispatch) {
  let actions = {
    ...timeCapsuleActions
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeCapsule);