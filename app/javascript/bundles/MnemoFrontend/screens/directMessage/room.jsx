import React from 'react';

export default class Room extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {currentRoomKey} = this.props;

    return (
    <div className={`col-9 ${currentRoomKey ? null : 'flex-box'}`}>
      {currentRoomKey ?
        <div>
          <div className="title-container">
            <div className="profile-container">
              <a>{friends[0].name}</a>
            </div>
          </div>
          <div className="chat-container">
            <div className="comment-field-container">
              <textarea placeholder="Type messages"/>
            </div>
          </div>
        </div>
      :
        <div className="room-placeholder">
          Text to someone to Create you Chat room
        </div>
      }
    </div>
    );
  }
}
