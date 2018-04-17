import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Image from '../../components/image'

class TimeCapsuleMemoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {memoryBoxes} = this.props;

    return (
      <div className="memory-boxes-container">
        {memoryBoxes.map((memoryBox, index) => {
          return (
            <div className="memory-box-item-container" key={index}>
              <div>
                <Image classNames="circle" src={memoryBox.user.image} size="xs" />
                <div className="memory-box-detail">
                  <h3>{memoryBox.user.name}</h3>
                  <span>
                    Put some message in this capsule
                  </span>
                </div>
              </div>

              <div>
                <div className="media-container"></div>
                <span>{moment(memoryBox.created_at.toLocaleString()).format('LLL')}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

TimeCapsuleMemoryBox.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default TimeCapsuleMemoryBox;