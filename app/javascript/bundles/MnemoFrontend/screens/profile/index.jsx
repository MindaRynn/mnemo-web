import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config/';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.state = initialState;
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;
  }

  componentDidUpdate(prevProps) {}

  render() {
    let {profile} = this.props

    return (
      <div>
        Hello profile
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

export default Profile;