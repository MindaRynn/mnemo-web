import React from "react";
import DatePicker from 'react-datepicker';

export default class CommentField extends React.Component {

  render() {
    let {startDate, endDate, startDateChangeHandler, endDateChangeHandler, sendTextHandler, containerClass} = this.props

    return (
      <div className={`${containerClass} comment-field-container`}>
        <textarea placeholder="Type messages" onKeyPress={e => sendTextHandler(e)}/>
        <div className="timing-container">
          <div className="col-md-6">
            <label>Wrap time: </label>
            <div className="small-field">
              <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={startDateChangeHandler}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="LT"
                timeCaption="Time"/>
            </div>
            <div className="large-field">
              <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={startDateChangeHandler}/>
            </div>
          </div>
          <div className="col-md-6">
            <label>Open time: </label>
            <div className="small-field">
              <DatePicker
                selected={endDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={endDateChangeHandler}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="LT"
                timeCaption="Time"/>
            </div>
            <div className="large-field">
              <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={endDateChangeHandler}/>
            </div>
          </div>
        </div>
        <div className="upload-container">
          <div className="col-md-6">
            <i className="fa fa-microphone"></i>
            <i className="fa fa-image"></i>
            <i className="fa fa-video-camera"></i>
          </div>
          <div className="col-md-6 align-right">
            <button onClick={e => sendTextHandler(e)}>Post</button>
          </div>
        </div>
      </div>
    );
  }
}
