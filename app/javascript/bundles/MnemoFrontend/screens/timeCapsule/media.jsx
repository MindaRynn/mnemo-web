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
            <div key={index}>
              <div className="add-data">
                <a href="" data-toggle="modal" data-target={(`#`+media.media_url).toString()}>
                    <Image src={media.media_url} size="m" />
                </a>
              </div>
              <div className="modal fade" id={(media.media_url).toString()} tabIndex="-1" role="dialog" aria-labelledby={(media.media_url).toString()} aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                          <div className="modal-body">
                              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button><br/>
                              <div className="container-fluid text-center">
                                <img src={media.media_url} className="img-fluid" alt=""/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
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