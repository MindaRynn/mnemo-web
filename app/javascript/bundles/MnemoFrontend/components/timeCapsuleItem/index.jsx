import React from 'react'
import PropTypes from 'prop-types';

import Image from '../../components/image/';
import moment from 'moment';

import StatusCircle from '../../screens/profile/statusCircle';

export default class TimeCapsuleItem extends React.Component {
  constructor(props) {
    super(props)
    this._clickHandler = this._clickHandler.bind(this);
    this.statusManager = this.statusManager.bind(this);
  }

  _clickHandler(e) {
    e.preventDefault();
    if(e.target.id == "labelDeleteButton") {
      let {actions, timeCapsule} = this.props
      actions.deleteTimeCapsule(timeCapsule.id)
    } else {
      let {timeCapsule} = this.props;
      window.location = `/timeCapsule/${timeCapsule.id}`;
    }
  }

  statusManager() {
    let {timeCapsule} = this.props
    let {currentUser} = this.context;
    let wrap_date = moment(this.props.timeCapsule.wrap_date)
    let open_date = moment(this.props.timeCapsule.open_date)

    let isOpened = currentUser.participation_ids.includes(timeCapsule.id) &&
      currentUser.opened_time_capsule_ids.includes(timeCapsule.id) &&
      moment().isAfter(open_date)

    if (isOpened) return "OPENNED"

    let isReady = currentUser.participation_ids.includes(timeCapsule.id) &&
      !currentUser.opened_time_capsule_ids.includes(timeCapsule.id) &&
      moment().isAfter(open_date)

    if (isReady) return "READY"

    let isJoined = currentUser.participation_ids.includes(timeCapsule.id) &&
      !currentUser.opened_time_capsule_ids.includes(timeCapsule.id) &&
      moment().isBefore(open_date) && moment().isAfter(wrap_date)

    if (isJoined) return "JOINED"

    let isAvailable = !currentUser.participation_ids.includes(timeCapsule.id) &&
                   !currentUser.opened_time_capsule_ids.includes(timeCapsule.id) &&
                   moment().isBefore(open_date) && moment().isAfter(wrap_date)

    if (isAvailable) return "AVAILABLE"
  }

  render() {
    let {timeCapsule} = this.props
    let {currentUser} = this.context;
    let created_at = moment(this.props.timeCapsule.created_at.toLocaleString()).format('LLL')
    let wrap_date = moment(this.props.timeCapsule.wrap_date.toLocaleString()).format('LLL')

    return (
      <div>
          <div id="formCapsule" onClick={e => this._clickHandler(e)} className="capsule-box">
          <div className="avatar-container"><Image size="s" src={timeCapsule.user.image}/></div>
          <div className="capsule-detail-container">
            <div className="header-container">
              <div>
                <h3>{timeCapsule.user.name}</h3>
                <div className="font-status-size">{created_at}</div>
              </div>
              <div>
                <div>{this.statusManager()}<StatusCircle status={this.statusManager()}/></div>
                <div>Wrapped {wrap_date}</div>
                { currentUser.name == timeCapsule.user.name && <label htmlFor="removeCapsule">
                  <i id="labelDeleteButton" className="fa fa-times delete-icon" aria-hidden="true"></i></label>}
                <input className="btn-delete-capsule" style={{display: "none"}} id="removeCapsule" type="button" onClick={e => this._clickHandler(e)} value="Delete"/>
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

TimeCapsuleItem.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};