import React from "react";
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import Image from "../../components/image";

class CommentField extends React.Component {
  constructor(props) {
    super(props);

    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.sendTextAndResetImage = this.sendTextAndResetImage.bind(this);

    this.state = {
      image: ''
    };
  }

  _openUploadWindow(){
    document.getElementById('uploader').click()
  }


  inputOnChangeHandler(e) {
    document.getElementById("submitButton").click();
  }

  submitHandler(e) {
    e.preventDefault();

    let data = new FormData(e.target);
    let _this = this;
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/upload");
    xhr.onload = function(event) {
      _this.setState({
        image: event.target.response
      });
    };

    xhr.send(data);
  }

  sendTextAndResetImage(e, image) {
    let {sendTextHandler} = this.props;

    let code = (e.keyCode ? e.keyCode : e.which);

    if (code == 13) {
      sendTextHandler(e, image);
      this.setState({
        image: ''
      })
    }
  }

  render() {
    let {openDate, openDateChangeHandler, sendTextHandler, containerClass, buttonText} = this.props
    let {currentUser} = this.context;

    return (
      <div className={`${containerClass} comment-field-container`}>
        <div className="upload-container">
          <form
            onSubmit={this.submitHandler}
            encType="multipart/form-data">
            <div onClick={this._openUploadWindow}>
              <Image type="standard" src={this.state.image} classNames={`${this.state.image.length ? '' : 'add-icon'}`}/>
            </div>

            <input
              onChange={this.inputOnChangeHandler}
              style={{ display: "none" }}
              id="uploader"
              type="file"
              name="file"/>

            <input
              id="submitButton"
              style={{ display: "none" }}
              type="submit"
              value="Upload"/>

            <input
              type="hidden"
              name="authenticity_token"
              value={currentUser.csrfToken}/>

            <input
              type="hidden"
              name="user[image]"
              value={this.state.image}/>
          </form>
        </div>
        <div className="textfield-container">
          <textarea placeholder="Type messages" onKeyPress={e => this.sendTextAndResetImage(e, this.state.image)}/>
          <div className="timing-container">
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
            </div>
            <button onClick={e => this.sendTextAndResetImage(e, this.state.image)}>{buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

CommentField.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default CommentField;
