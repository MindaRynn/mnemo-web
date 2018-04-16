import React from "react";
import PropTypes from 'prop-types';

import Image from "../../components/image";

const initialState = {
  memoryBoxDetail: ''
};

class MemoryBoxForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = initialState

    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this._memoryBoxDetailHandler = this._memoryBoxDetailHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    // let {createTimeCapsuleSuccess} = this.props.timeCapsule;
    // let {resetFormHandler} = this.props;
    //
    // if(!prevProps.timeCapsule.createTimeCapsuleSuccess && createTimeCapsuleSuccess) {
    //   this.setState(initialState)
    //   resetFormHandler();
    // }
  }

  _openUploadWindow(){
    document.getElementById('uploader').click()
  }


  inputOnChangeHandler(e) {
    document.getElementById("submitButton").click();
  }

  _memoryBoxDetailHandler(e){
    e.preventDefault();

    this.setState({
      capsuleDetail: e.target.value
    });
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
    let {sendTextHandler, buttonText, medium} = this.props;
    let {currentUser} = this.context;

    return (
      <div className='comment-field-container capsule-form'>
        <div className="profile col-1">
          <Image classNames="circle" src={currentUser.image} size="s" />
        </div>
        <div className="form-group col-11">
          <div className="textfield-group">
            <textarea placeholder="Tell about these Memories" onChange={this._memoryBoxDetailHandler}  value={this.state.capsuleDetail} />
          </div>

          <div className="media-form">
            {medium.map((media, index) => {

              return (
                <Image key={index} src={media} size="l" />
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
          <div className="button-container">
            <button className="submit-button" onClick={e => sendTextHandler(e, this.state)}>{buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

MemoryBoxForm.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};


export default MemoryBoxForm;