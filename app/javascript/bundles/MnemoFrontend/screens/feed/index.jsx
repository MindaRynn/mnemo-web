import React from 'react';
import PropTypes from 'prop-types';

class Feed extends React.Component {
  constructor(props, context) {
    super(props, context);
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