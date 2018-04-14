import React from 'react';
import PropTypes from 'prop-types';

class Feed extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;

    actions.fetchTimeCapsule(currentUser.id);
  }

  render() {

    return (
      <div>
        FEED
      </div>
    );
  }
}

Feed.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default Feed;