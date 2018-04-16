import React from 'react'
import Image from '../../components/image/';
import moment from 'moment';
import Link from 'react-router';

import StatusCircle from '../../screens/profile/statusCircle';

export default class TimeCapsuleItem extends React.Component {
  constructor(props) {
    super(props)
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(e) {
    let {timeCapsule} = this.props;
    window.location = `/timeCapsule/${timeCapsule.id}`;
  }

  render() {
    let {timeCapsule} = this.props
    let status = this.props.timeCapsule.status == 0 ? "AVAILABLE" : "JOINED";
    let created_at = moment(this.props.timeCapsule.created_at.toLocaleString()).format('LLL')
    let wrap_date = moment(this.props.timeCapsule.wrap_date.toLocaleString()).format('LLL')

    return (
      <div onClick={e => this._clickHandler(e)} className="capsule-box">
        <div className="avatar-container"><Image size="s" src={timeCapsule.user.image}/></div>
        <div className="capsule-detail-container">
          <div className="header-container">
            <div>
              <h3>{timeCapsule.user.name}</h3>
              <div className="font-status-size">{created_at}</div>
            </div>
            <div>
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
    );
  }
}