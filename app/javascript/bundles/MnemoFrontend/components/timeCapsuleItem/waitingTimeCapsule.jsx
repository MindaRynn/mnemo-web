import React from 'react';
import moment from 'moment';

export default class WaitingTimeCapsule extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);

    this.state = {
      secondsElapsed: 0,
      open_date: moment(this.props.capsule.open_date.toLocaleString()).format('LLL'),
      first_label: 'Years',
      second_label: 'Months',
      third_label: 'Days',
      first_time: 0,
      second_time: 0,
      third_time: 0
    }
  }

  updateState() {
    let openDate = new moment(this.props.capsule.open_date.toLocaleString());
    let currentTime = new moment()
    let numDayCurrentMonth = moment().daysInMonth();
    let diffYear = openDate.diff(currentTime, "years")
    let diffMonth = openDate.diff(currentTime, "months")
    let diffDay = openDate.diff(currentTime, "days")
    let diffHour = openDate.diff(currentTime, "hours")
    let diffMinute = openDate.diff(currentTime, "minutes")
    let diffSecond = openDate.diff(currentTime, "seconds")
    if(diffYear > 0) {
      return (this.setState({
        first_time: diffYear,
        second_time: diffMonth%12,
        third_time: diffDay%numDayCurrentMonth,
        first_label: 'Years',
        second_label: 'Months',
        third_label: 'Days'
      }))
    } else if(diffMonth > 0) {
      return (this.setState({
        first_time: diffMonth%12,
        second_time: diffDay%numDayCurrentMonth,
        third_time: diffHour%24,
        first_label: 'Months',
        second_label: 'Days',
        third_label: 'Hours'
      }))
    } else if(diffDay > 0) {
      return (this.setState({
        first_time: diffDay%numDayCurrentMonth,
        second_time: diffHour%24,
        third_time: diffMinute%60,
        first_label: 'Days',
        second_label: 'Hours',
        third_label: 'Minutes'
      }))
    } else if(diffHour > 0 || diffMinute > 0 || diffSecond >= 0) {
       return (this.setState({
        first_time: diffHour%24,
        second_time: diffMinute%60,
        third_time: diffSecond%60,
        first_label: 'Hours',
        second_label: 'Minutes',
        third_label: 'Seconds'
        }))
    }
  }
  
  componentDidMount() {
    this.interval = setInterval(this.updateState, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    let {name,avatar,capsule} = this.props

    return (
      <div className="waiting-capsule-box">
        <div className="timimg-container">
          <div className="left-container">
            <div className="font-label">{this.state.first_label}</div>
            <div className="font-time">{this.state.first_time}</div>
          </div>
          <div className="center-container">
            <div className="font-label">{this.state.second_label}</div>
            <div className="font-time">{this.state.second_time}</div>
          </div>
          <div className="right-container">
            <div className="font-label">{this.state.third_label}</div>
            <div className="font-time">{this.state.third_time}</div>
          </div>
        </div>
      </div>
    );
  }
}