import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DetailSection from './detail';
import MediaSection from './media';

import Image from '../../components/image'

class TimeCapsuleMemoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentTime: moment()
    }
  }

  render() {
    let {memoryBoxes, openDate} = this.props;

    return (
      <div className="memory-boxes-container">
        {memoryBoxes.map((memoryBox, index) => {
          return (
            <div className="memory-box-item-container" key={index}>
              <div>
                <Image classNames="circle" src={memoryBox.user.image} size="xs" />
                <div className="memory-box-detail">
                  <h3>{memoryBox.user.name}</h3>
                  { this.state.currentTime.diff(openDate) < 0 ? 
                     <span>Put some message in this capsule</span> :
                     <span>
                      <div>{memoryBox.description}</div>
                      <div className="media-container">
                        {memoryBox.medium.map((media, index) => {
  
                          return (
                            <Image key={index} src={media.media_url} size="m" />
                          );
                        })}
                      </div>
                    </span>
                  }
                </div>
              </div>

              <div>
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