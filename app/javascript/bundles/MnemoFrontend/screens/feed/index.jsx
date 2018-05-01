import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './categoryList'
import CapsuleList from './capsuleList'

import Capsule from '../../components/timeCapsuleItem/index'

const initialState = {
  fetchedCapsule: false,
  fetchedTag: false,
  fetchedUser:false
};

class Feed extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = initialState;
  }

  componentDidMount() {
    let {actions} = this.props;
    let {currentUser} = this.context;

    actions.fetchTimeCapsule();
    actions.fetchTags();
    actions.fetchUser(currentUser.id);
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess} = this.props.feed.timeCapsule
    let {fetchTagSuccess} = this.props.feed.tag
    let {fetchUserSuccess} = this.props.feed.user

    if(fetchTimeCapsuleSuccess && !prevProps.feed.timeCapsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }

    if(fetchTagSuccess && !prevProps.feed.tag.fetchTagSuccess) {
      this.setState({
        fetchedTag: true,
      });
    }

    if(fetchUserSuccess && !prevProps.feed.user.fetchUserSuccess) {
      this.setState({
        fetchedUser: true,
      });
    }
  }

  render() {
    let {fetchedCapsule, fetchedTag, fetchedUser} = this.state
    let {actions, feed} = this.props;
    let {medium} = this.props.feed.media
    let {users} = this.props.feed.user

    return (
      <div className="row">
        {fetchedTag ? <CategoryList tags={feed.tag.tags} actions={actions} /> : null }
        {fetchedCapsule && fetchedUser ? <CapsuleList allUsers={users} actions={actions} medium={medium} timeCapsule={feed.timeCapsule} tags={feed.tag.tags} /> : null }
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
