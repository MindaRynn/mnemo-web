import React from 'react';
import TimeCapsuleItem from './';
import WaitingTimeCapsuleItem from './waitingTimeCapsule';
import moment from 'moment';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

export default class ContainerSwitch extends React.Component {
  constructor(props) {
    super(props)

    this.checkIfWaiting = this.checkIfWaiting.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      isWaiting: this.checkIfWaiting()
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.updateState, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    let {isWaiting} = this.state;
    let {timeCapsule} = this.props
    let {currentUser} = this.context;

    if(!isWaiting && prevState.isWaiting) {
      firebase.database().ref().child('notification').child(currentUser.notification_key).push({
        type: 'capsule',
        url: `timeCapsule/${timeCapsule.id}`,
        seen: false,
        notiTime: moment().toDate().toLocaleDateString(),
        user: currentUser
      })
    }
  }

  updateState() {
    this.setState(
      {
        isWaiting: this.checkIfWaiting()
      }
    )
  }

  checkIfWaiting() {
    let {timeCapsule} = this.props

    let wrapDate = new moment(timeCapsule.wrap_date);
    let openDate = new moment(timeCapsule.open_date);

    return moment().isBefore(openDate) && moment().isAfter(wrapDate);
  }

  render() {
    let {avatar,name,timeCapsule, actions} = this.props

    return (
      <div>
        {this.state.isWaiting ? <WaitingTimeCapsuleItem avatar={avatar}
                                             name={name}
                                             timeCapsule={timeCapsule}/> :
                     <TimeCapsuleItem avatar={avatar}
                                      name={name}
                                      timeCapsule={timeCapsule}
                                      actions={actions} />}
      </div>
    );
  }
}

ContainerSwitch.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};