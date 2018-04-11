import React from 'react';
import ProfileScreen from '../screens/profile/';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseContainer from './Base';

// import {ProfileActions} from '../actions/profile/';

class Profile extends BaseContainer {
  static displayName = 'Profile';

  render() {
    return (
      <div>
        <ProfileScreen {...this.props}/>
      </div>
    );
  }
}

Profile.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};


Profile.propTypes = {
  /**
   * Holds the available action creators.
   * */
  actions: PropTypes.object.isRequired,
  /**
   * Holds the profile store
   * */
  profile: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  let {profile} = state;

  return {
    profile
  };
}

// function mapDispatchToProps(dispatch) {
//   let actions = {
//     ...profileActions
//   };

//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Profile);