import React from 'react';
import TimeCapsuleItem from './';
import WaitingTimeCapsuleItem from './waitingTimeCapsule';

export default class ContainerSwitch extends React.Component {
  constructor(props) {
    super(props)

    this.switchComponent = this.switchComponent.bind(this)

    this.state = {
      status: this.props.status
    }
  }

  switchComponent(status) {
    this.setState({
      status: status
    })
  }

  render() {
    let {avatar,name,timeCapsule} = this.props

    return (
      <div>
        {this.state.status == "isNotWaiting" ? <TimeCapsuleItem switchComponent={this.switchComponent}
                       avatar={avatar}
                       name={name}
                       timeCapsule={timeCapsule}/> : 
                       <WaitingTimeCapsuleItem switchComponent={this.switchComponent}
                       avatar={avatar}
                       name={name}
                       timeCapsule={timeCapsule}/>}
      </div>
    );
  }
}