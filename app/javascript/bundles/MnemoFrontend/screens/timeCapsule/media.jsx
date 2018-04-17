import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../components/image'

class TimeCapsuleMedia extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {timeCapsule} = this.props;
    let topicBox = timeCapsule.memory_boxes[0];
    let {medium} = topicBox;

    return (
      <div className="media-container">
        {medium.map((media, index) => {

          return (
            <Image key={index} src={media.media_url} size="m" />
          );
        })}
      </div>
    );
  }
}

TimeCapsuleMedia.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default TimeCapsuleMedia;