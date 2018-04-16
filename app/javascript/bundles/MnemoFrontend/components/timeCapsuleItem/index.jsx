import React from 'react'
import Image from '../../components/image/';
import moment from 'moment';

import StatusCircle from '../../screens/profile/statusCircle';

export default class TimeCapsuleItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {name,avatar,timeCapsule} = this.props
    let status = this.props.timeCapsule.status == 0 ? "AVAILABLE" : "JOINED";
    let created_at = moment(this.props.timeCapsule.created_at.toLocaleString()).format('LLL')
    let wrap_date = moment(this.props.timeCapsule.wrap_date.toLocaleString()).format('LLL')

    return (
      <div>
        <div className="capsule-box">
          <div className="avatar-container"><Image size="s" src={avatar}/></div>
          <div className="capsule-detail-container">
            <div className="header-container">
              <div className="left-section">
                <h3>{name}</h3>
                <div className="font-status-size">{created_at}</div>
              </div>
              <div className="right-section">
                <div>{status}<StatusCircle status={status}/></div>
                <div>Wrapped {wrap_date}</div>
              </div>
            </div>
            <h3>{timeCapsule.subject}</h3>
            <div className="">
              {timeCapsule.memory_boxes[0].description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}