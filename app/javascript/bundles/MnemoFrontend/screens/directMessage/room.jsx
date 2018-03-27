import React from 'react';
import PropTypes from 'prop-types';

import Message from './message'

class Room extends React.Component {

  constructor(props) {
    super(props)

    this._roomName = this._roomName.bind(this);
    this._sendText = this._sendText.bind(this);
  }

  componentDidUpdate(prevProps) {
    let {currentRoom, firebaseRef} = this.props

    if (prevProps.currentRoom.room_key !== currentRoom.room_key) {
      firebaseRef.child(currentRoom.room_key).once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log(childData)
          console.log(childKey)
          console.log("---------------")

        });
      });
    }
  }

  _roomName(room){
    let {currentUser} = this.context;

    if (room.name) return room.name

    return room.users.filter(user => user.id != currentUser.id)[0].name;
  }

  _sendText(e) {
    let code = (e.keyCode ? e.keyCode : e.which);

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
  }

  render() {
    let {currentRoom} = this.props;

    return (
    <div className={`col-9 ${Object.getOwnPropertyNames(currentRoom).length === 0 ? 'flex-box' : ''}`}>
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
            <div className="message-container">
              <Message text="test" className="mine" />
              <Message text="test" />
              <Message text="test" />
            </div>
            <div className="comment-field-container">
              <textarea placeholder="Type messages" onKeyPress={e => this._sendText(e)}/>
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