import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseContainer from './Base';
import DirectMessageScreen from '../screens/directMessage/';

import {userDirectMessageActions} from '../actions/directMessage/';

class DirectMessage extends BaseContainer {
  static displayName = 'DirectMessage';

  render() {

    return (
      <DirectMessageScreen />
    );
  }
}
//
// DirectMessage.contextTypes = {
//   /**
//    * Holds the current logged in user
//    * */
//   currentUser: PropTypes.object.isRequired
// };
//
//
// DirectMessage.propTypes = {
//   /**
//    * Holds the available action creators.
//    * */
//   actions: PropTypes.object.isRequired,
//   /**
//    * Holds the profile store
//    * */
//   directMessage: PropTypes.object.isRequired,
// };
//
// function mapStateToProps(state) {
//   let {directMessage} = state;
//
//   return {
//     directMessage
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   let actions = {
//     ...userDirectMessageActions
//   };
//
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default DirectMessage;