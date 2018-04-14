import React from "react";
import DatePicker from 'react-datepicker';

export default class CapsuleForm extends React.Component {

  static defaultProps = {
    hasWrapTime: false,
    hasOpenTime: false
  };

  render() {
    let {wrapDate, openDate, wrapDateChangeHandler, openDateChangeHandler, sendTextHandler, containerClass, hasWrapTime, hasOpenTime, buttonText} = this.props

    return (
      <div className={`${containerClass} comment-field-container`}>
        <textarea placeholder="Type messages" onKeyPress={e => sendTextHandler(e)}/>
        <div className="timing-container">
          {
            hasWrapTime ?
              <div>
                <label>Wrap time: </label>
                <div className="small-field">
                  <DatePicker
                    selected={wrapDate}
                    selectsStart
                    onChange={wrapDateChangeHandler}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="LT"
                    timeCaption="Time"
                  />
                </div>
                <div className="large-field">
                  <DatePicker
                    selected={wrapDate}
                    selectsStart
                    onChange={wrapDateChangeHandler}
                  />
                </div>
              </div> : null
          }

          {
            hasOpenTime ?
              <div>
                <label>Open time: </label>
                <div className="small-field">
                  <DatePicker
                    selected={openDate}
                    selectsStart
                    onChange={openDateChangeHandler}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="LT"
                    timeCaption="Time"
                  />
                </div>
                <div className="large-field">
                  <DatePicker
                    selected={openDate}
                    selectsStart
                    onChange={openDateChangeHandler}
                  />
                </div>
              </div> : null
          }

        </div>
        <div className="upload-container">
          <button onClick={e => sendTextHandler(e)}>{buttonText}</button>
        </div>
      </div>
    );
  }
}
