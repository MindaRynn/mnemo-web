import React from 'react';
import PropTypes from 'prop-types';
import appendReactDOM from 'append-react-dom';
import Message from './message'
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Room extends React.Component {

  constructor(props) {
    super(props)
    this._roomName = this._roomName.bind(this);
    this._sendText = this._sendText.bind(this);
    this.state = {
      startDate: moment(),
      endDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChange ({ startDate, endDate }){
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  }

  handleChangeStart (startDate) { this.handleChange({ startDate }); }

  handleChangeEnd (endDate) { this.handleChange({ endDate }); }

  componentDidUpdate(prevProps) {
    let {currentRoom, firebaseRef} = this.props
    let {currentUser} = this.context;

    let el = document.getElementsByClassName('message-container')[0]

    if (prevProps.currentRoom.room_key !== currentRoom.room_key) {
      document.getElementsByClassName('message-container')[0].innerHTML = ""

      firebaseRef.child(currentRoom.room_key).once('value', function(snapshot) {
        let itemsProcessed = 0;
        let length = snapshot.numChildren()

        snapshot.forEach(function(childSnapshot) {
          itemsProcessed++;

          var childData = childSnapshot.val();
          var className =  childData.user_id == currentUser.id ? 'mine' : null
          appendReactDOM(Message, el, {
            text: childData.message,
            className: className
          });
          if(itemsProcessed === length) {
            el.scrollTo(0, el.scrollHeight - el.clientHeight);
          }
        })
      });

      firebaseRef.child(currentRoom.room_key).on('child_added',function(snapshot){
        let className =  snapshot.val().user_id == currentUser.id ? 'mine' : null

        appendReactDOM(Message, el, {
          text: snapshot.val().message,
          className: className
        });

        el.scrollTo(0, el.scrollHeight - el.clientHeight);
      })
    }
  }

  _roomName(room){
    let {currentUser} = this.context;

    if (room.name) return room.name

    return room.users.filter(user => user.id != currentUser.id)[0].name;
  }

  _sendText(e) {
    let code = (e.keyCode ? e.keyCode : e.which);
    let el = document.getElementsByClassName('message-container')[0]

    if (code == 13) {
      e.preventDefault();

      let {currentUser} = this.context;
      let {currentRoom, firebaseRef} = this.props

      let messageField = document.getElementsByTagName('textarea')[0]


      firebaseRef.child(currentRoom.room_key).push (
        {
          user_id: currentUser.id,
          message: messageField.value
        }
      )

      messageField.value = ''
    }

    el.scrollTo(0, el.scrollHeight - el.clientHeight);
  }

  render() {
    let {currentRoom} = this.props;
    var date = new Date();
    return (
    <div className={`col-8 ${Object.getOwnPropertyNames(currentRoom).length === 0 ? 'flex-box' : ''}`}>
      { Object.getOwnPropertyNames(currentRoom).length === 0 ?
        <div className="room-placeholder">
          Text to someone to Create you Chat room
        </div>
      :
        <div className="chat-container">
          <div className="title-container">
            <div className="profile-container">
              <a>{this._roomName(currentRoom)}</a>
            </div>
          </div>

          <div className="content-group">
            <div className="message-container" />
            <div className="col-8 comment-field-container">
              <textarea placeholder="Type messages" onKeyPress={e => this._sendText(e)}/>
              <div className="timing-container">
                <div className="col-md-6">
                  <label>Wrap time: </label>
                  <div className="small-field">
                    <DatePicker
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="LT"
                      timeCaption="Time"
                    />
                  </div>
                  <div className="large-field">
                    <DatePicker
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Open time: </label>
                  <div className="small-field">
                    <DatePicker
                      selected={this.state.endDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="LT"
                      timeCaption="Time"
                    />
                  </div>
                  <div className="large-field">
                    <DatePicker
                      selected={this.state.endDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                    />
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
                  <button>Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
    );
  }
}
Room.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default Room;
