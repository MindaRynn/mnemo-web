import React from "react";
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import Image from "../../components/image";

class CapsuleForm extends React.Component {

  constructor(props) {
    super(props);

    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  _openUploadWindow(){
    document.getElementById('uploader').click()
  }


  inputOnChangeHandler(e) {
    document.getElementById("submitButton").click();
  }

  submitHandler(e) {
    e.preventDefault();

    let {actions} = this.props;

    let data = new FormData(e.target);
    let _this = this;
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/upload");

    xhr.onload = function(event) {
      actions.addMedia(event.target.response)
    };

    xhr.send(data);
  }

  render() {
    let {wrapDate, openDate, wrapDateChangeHandler, openDateChangeHandler, sendTextHandler, buttonText, medium} = this.props;
    let {currentUser} = this.context;

    return (
      <div className='comment-field-container'>
        <div className="profile col-1">
          PROFILE
        </div>
        <div className="form-group col-11">
          <textarea placeholder="Type messages" onKeyPress={e => sendTextHandler(e)}/>

          <div className="media-form">
            {medium.map((media, index) => {

              return (
                <Image key={index} type="standard" src={media} size="l" />
              );
            })}
            { medium.length >= 4 ?
              null :
              <div className="upload-container">
                <form
                  onSubmit={this.submitHandler}
                  encType="multipart/form-data">
                  <div className="upload-button" onClick={this._openUploadWindow}>
                    <Image type="standard" classNames='add-icon' size="l"/>
                  </div>

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
                    onChange={this.inputOnChangeHandler}
                    style={{ display: "none" }}
                    id="uploader"
                    type="file"
                    name="file"/>
                </form>
              </div>
            }
          </div>

          <div className="timing-container">
            <div>
              <label>Wrap time: </label>
              <div className="small-field">
                <DatePicker selected={wrapDate}
                            selectsStart
                            onChange={wrapDateChangeHandler}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time"/>
              </div>
              <div className="large-field">
                <DatePicker selected={wrapDate}
                            selectsStart
                            onChange={wrapDateChangeHandler}/>
              </div>
            </div>
            <div>
              <label>Open time: </label>
              <div className="small-field">
                <DatePicker selected={openDate}
                            selectsStart
                            onChange={openDateChangeHandler}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time" />
              </div>
              <div className="large-field">
                <DatePicker selected={openDate}
                            selectsStart
                            onChange={openDateChangeHandler}/>
              </div>
            </div>
          </div>
          <div className="button-container">
            <div>
              <label>Open time: </label>
              <div className="dropdown show">
                <a className="btn dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown link
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </div>
            <button onClick={e => sendTextHandler(e)}>{buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

CapsuleForm.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};


export default CapsuleForm;