import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './categoryList'
import CapsuleList from './capsuleList'

import Capsule from '../../components/timeCapsuleItem/index'

const initialState = {
  fetchedCapsule: false
};

class Feed extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = initialState;
  }

  componentDidMount() {
    let {actions} = this.props;

    actions.fetchTimeCapsule();
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess} = this.props.feed.timeCapsule

    if(fetchTimeCapsuleSuccess && !prevProps.feed.timeCapsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }
  }

  render() {
    let {fetchedCapsule} = this.state
    let {actions, feed} = this.props;
    let {medium} = this.props.feed.media

    return (
      <div className="row">
        <CategoryList />
        {fetchedCapsule ? <CapsuleList actions={actions} medium={medium} timeCapsule={feed.timeCapsule} /> : null }
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