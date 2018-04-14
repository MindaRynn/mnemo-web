import React from 'react';
import PropTypes from 'prop-types';

const initialState = {
  fetchedCapsule: false
};

class Feed extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = initialState;
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;

    actions.fetchTimeCapsule(currentUser.id);
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess, timeCapsules} = this.props.feed.timeCapsule

    if(fetchTimeCapsuleSuccess && !prevProps.feed.timeCapsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }
  }

  render() {
    let {fetchedCapsule} = this.state

    return (
      <div className="row">
        <div className="list col-4">
          Category
        </div>
        {fetchedCapsule ?
          <div className="list col-8">
            FEED LIST
          </div> : null }
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