import React from 'react';
import TimeCapsuleItem from './';
import WaitingTimeCapsuleItem from './waitingTimeCapsule';
import moment from 'moment';

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
    let _this = this;
    this.interval = setInterval(this.updateState, 1000);
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