import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './categoryList'
import CapsuleList from './capsuleList'

import Capsule from '../../components/timeCapsuleItem/index'

const initialState = {
  fetchedCapsule: false,
  fetchedTag: false
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
    actions.fetchTimeCapsule(currentUser.id);
    actions.fetchTags();
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess} = this.props.feed.timeCapsule
    let {fetchTagSuccess} = this.props.feed.tag

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
  }

  render() {
    let {fetchedCapsule, fetchedTag} = this.state
    let {actions, feed} = this.props;
    let {medium} = this.props.feed.media

    return (
      <div className="row">
        {fetchedTag ? <CategoryList tags={feed.tag.tags} /> : null }
        {fetchedCapsule ? <CapsuleList actions={actions} medium={medium} timeCapsule={feed.timeCapsule} tags={feed.tag.tags} /> : null }
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
