import React from 'react';
import PropTypes from 'prop-types';

class CapsuleList extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="list col-8">
        Capsule List
      </div>
    );
  }
}

CapsuleList.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default CapsuleList;