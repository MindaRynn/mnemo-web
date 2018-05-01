import React from "react";
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

import Image from "../../components/image";
import SearchForm from "../../components/searchForm";

const directType = {
  me: 'Only me',
  everyone: 'Everyone who join',
  friend: 'Friend'
};

const initialState = {
  directTo: 'everyone',
  capsuleName: '',
  capsuleDetail: '',
  capsuleTag:'General',
  friendId: ''
};



class CapsuleForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = initialState


    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this._checkIfSelected = this._checkIfSelected.bind(this);
    this._setDirectTo = this._setDirectTo.bind(this);
    this._capsuleNameHandler = this._capsuleNameHandler.bind(this);
    this._capsuleDetailHandler = this._capsuleDetailHandler.bind(this);
    this._capsuleTagHandler = this._capsuleTagHandler.bind(this);
    this._friendIdHandler = this._friendIdHandler.bind(this);
    this._deleteMedia = this._deleteMedia.bind(this);
    this._updateWrappedTime = this._updateWrappedTime.bind(this);
  }

  componentWillMount(){
    let {typeEdit, timeCapsule} = this.props;

    if(typeEdit) {
      this.setState({
        directTo: timeCapsule.direct_type,
        capsuleName: timeCapsule.subject,
        capsuleDetail: timeCapsule.memory_boxes[0].description,
        currentTime : this.props.wrapDate
      })
    }
  }

  _updateWrappedTime() {
    this.setState({
      currentTime: moment()
    })
  }

  componentDidMount() {
    this.interval = setInterval(this._updateWrappedTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    let {createTimeCapsuleSuccess} = this.props.timeCapsule;
    let {resetFormHandler} = this.props;

    if(!prevProps.timeCapsule.createTimeCapsuleSuccess && createTimeCapsuleSuccess) {
      this.setState(initialState)
      resetFormHandler();
    }
  }

  _openUploadWindow(){
    document.getElementById('capsule-form-uploader').click()
  }


  inputOnChangeHandler(e) {
    document.getElementById("capsule-form-submit-button").click();
  }

  _capsuleNameHandler(e){
    e.preventDefault();

    this.setState({
      capsuleName: e.target.value
    });
  }

  _capsuleDetailHandler(e){
    e.preventDefault();

    this.setState({
      capsuleDetail: e.target.value
    });
  }

  _capsuleTagHandler(e){
    e.preventDefault();

    this.setState({
      capsuleTag: e.target.innerHTML
    });
  }

  _friendIdHandler(e, userId){
    e.preventDefault();

    this.setState({
      friendId: userId
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

  _checkIfSelected(selected) {
    let {directTo} = this.state;

    if (selected == directTo) return 'selected';

    return ''
  }

  _setDirectTo(e, selected) {
    e.preventDefault();

    this.setState({
      directTo: selected
    })
  }

  _deleteMedia(e, index) {
    let {actions} = this.props

    actions.deleteMedia(index);
  }

  render() {
    let {typeEdit, wrapDate, openDate, wrapDateChangeHandler, openDateChangeHandler, sendTextHandler, buttonText, medium, tags, allUsers} = this.props;
    let {currentUser} = this.context;
    let {directTo} = this.state;
    const dummyAvatar = "https://storage.googleapis.com/mnemo-storage/placeHolderAvatar/tempAvatar.jpg";
    

    return (
      <div className='comment-field-container capsule-form'>
        {!typeEdit ?
          <div className="profile">
            <Image classNames="circle" src={currentUser.image || dummyAvatar} size="s" />
          </div> : null
        }
        <div className="form-group">
          <div className="textfield-group">
            <div className="timing-container">
              <input className="half-field" placeholder="Capsule's Name"  onChange={this._capsuleNameHandler} value={this.state.capsuleName} />
              <div className="half-field">
                <div className="padding">
                  <label>Tag : </label>
                  <div className="dropdown show">
                    <a className="btn dropdown-toggle"
                       id="dropdownMenuLink"
                       data-toggle="dropdown"
                       aria-haspopup="true"
                       aria-expanded="false"
                       placeholder="Tag"
                       onChange={this._capsuleTagHandler}
                       value={this.state.capsuleTag}>
                       {this.state.capsuleTag}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      {tags.map((tag, index) => {
                        return (
                          <a key={index} onClick={e => this._capsuleTagHandler(e)} className={`dropdown-item`} href="#">{tag.tag}</a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <textarea placeholder="Tell about these Memories" onChange={this._capsuleDetailHandler}  value={this.state.capsuleDetail} />
          </div>

          <div className="media-form">
            <div className="media-wrapper">
              {medium.map((media, index) => {

                return (
                <div className="image-wrapper" key={index} onClick={e => this._deleteMedia(e, index)}>
                  <Image src={media} size="m" />
                </div>
                );
              })}
              { medium.length >= 4 ?
                null :
                <div className="upload-container">
                  <form
                    onSubmit={this.submitHandler}
                    encType="multipart/form-data">
                    <div className="upload-button" onClick={this._openUploadWindow}>
                      <Image type="standard" classNames='add-icon' size="m"/>
                    </div>

                    <input
                      id="capsule-form-submit-button"
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
                      id="capsule-form-uploader"
                      type="file"
                      name="file"/>
                  </form>
                </div>
              }
            </div>
          </div>

          <div className="timing-container">
            <div>
              <label>Wrap time : </label>
              <div className="small-field">
                <DatePicker selected={moment(wrapDate).diff(this.state.currentTime) < 0 ? this.state.currentTime : wrapDate}
                            selectsStart
                            onChange={wrapDateChangeHandler}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time"/>
              </div>
              <div className="large-field">
                <DatePicker selected={moment(wrapDate).diff(this.state.currentTime) < 0 ? this.state.currentTime : wrapDate}
                            selectsStart
                            onChange={wrapDateChangeHandler}/>
              </div>
            </div>
            <div>
              <label>Open time : </label>
              <div className="small-field">
                <DatePicker selected={moment(openDate).diff(this.state.currentTime) > 0 ? openDate : this.state.currentTime}
                            selectsStart
                            onChange={openDateChangeHandler}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time" />
              </div>
              <div className="large-field">
                <DatePicker selected={moment(openDate).diff(this.state.currentTime) > 0 ? openDate : this.state.currentTime}
                            selectsStart
                            onChange={openDateChangeHandler}/>
              </div>
            </div>
          </div>
          <div className="button-container">
            <div>
              <label>Direct to : </label>
              <div className="dropdown show">
                <a className={`btn dropdown-toggle ${directTo == 'friend' ? 'friend' : ''}`}
                   id="dropdownMenuLink"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false">
                  {directType[directTo]}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a onClick={e => this._setDirectTo(e, 'me')} className={`dropdown-item ${ this._checkIfSelected('me', directTo)}`} href="#">{directType['me']}</a>
                  <a onClick={e => this._setDirectTo(e, 'everyone')} className={`dropdown-item ${ this._checkIfSelected('everyone', directTo)}`} href="#">{directType['everyone']}</a>
                  <a onClick={e => this._setDirectTo(e, 'friend')} className={`dropdown-item ${ this._checkIfSelected('friend' ,directTo)}`} href="#">{directType['friend']}</a>
                </div>
              </div>
            </div>
            {
             directTo == 'friend' ?
               <div className="friend-seach-container">
                 <SearchForm onChangeHandler={this._friendIdHandler} hasOnClick={true} allUser={allUsers}/>
               </div> : null
            }
            <button className="submit-button" onClick={e => sendTextHandler(e, this.state)}>{buttonText}</button>
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
