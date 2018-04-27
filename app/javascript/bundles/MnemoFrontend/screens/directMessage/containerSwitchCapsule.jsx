import React from 'react';
import Image from './image';
import MessageWithImage from './messageWithImage'
import Message from './message'
import WaitingTimeCapsuleItem from './waitingTimeCapsule';
import moment from 'moment';

export default class ContainerSwitch extends React.Component {
  constructor(props) {
    super(props)

    this.switchComponent = this.switchComponent.bind(this)
    this._renderCap = this._renderCap.bind(this)

    this.state = {
      isWaiting: this.props.openDate ? moment(this.props.openDate).isAfter(moment()) : false,
      src: this.props.src,
      text: this.props.text,
      className: this.props.className,
      openDate: this.props.openDate
    }
  }

  switchComponent() {
    this.setState({
      isWaiting: !this.state.isWaiting
    })
  }

  _renderCap() {
    if(this.state.src == '') {
      return <Message text={this.state.text} className={this.state.className}/>
    } else if(this.state.text == '') {
      return <Image src={this.state.src} className={this.state.className}/>
    } else {
      return <MessageWithImage text={this.state.text} src={this.state.src} className={this.state.className}/>
    }
  }

  render() {
    return (
      <div>
        {this.state.isWaiting ? <WaitingTimeCapsuleItem switchComponent={this.switchComponent}
                       openDate={this.state.openDate}/> : 
                       this._renderCap()}
      </div>
    );
  }
}