import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import ContactList from './contactList'
import RoomList from './roomList'
import Room from './room'
import config from '../../config/';

const initialState = {
  fetchedFriend: false,
  fetchedRoom: false,
  currentRoomKey: ''
};

class DirectMessage extends React.Component {
  constructor(props, context) {
    super(props, context);

    firebase.initializeApp(config['firebase']);

    this.state = initialState;

    this._setRoom = this._setRoom.bind(this);
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;

    actions.fetchUserFriend(currentUser.id);
    actions.fetchRoom(currentUser.id);
  }

  componentDidUpdate(prevProps) {
    let {fetchFriendSuccess, friends} = this.props.directMessage.friend
    let {fetchRoomSuccess} = this.props.directMessage.room;

    if(fetchFriendSuccess && !prevProps.directMessage.friend.fetchFriendSuccess) {
      this.setState({
        fetchedFriend: true,
        currentRoomKey: friends[0].room_key
      });
    }

    if(fetchRoomSuccess && !prevProps.directMessage.room.fetchRoomSuccess) {
      this.setState({
        fetchedRoom: true
      });
    }
  }

  _setRoom(e, friendId) {
    let {actions} = this.props;

    actions.getRoom(friendId);
  }

  render() {
    let {directMessage} = this.props
    let {rooms, room} = directMessage.room;
    let {fetchedFriend, currentRoomKey} = this.state;

    return (
      <div className="row">
        {fetchedFriend ?
        <div className="list col-3">
          <div className="title-container">
            <ul className="nav">
              <li><a data-toggle="tab" href="#menu1" className="active show">Contact</a></li>
              <li><a data-toggle="tab" href="#menu2">Message</a></li>
            </ul>
          </div>

          <div className="content-group">
            <ContactList directMessage={directMessage} currentRoomKey={currentRoomKey} itemClickHandler={this._setRoom} firebase={firebase} />
            <RoomList rooms={rooms}/>
          </div>
        </div> : null }
        <Room currentRoom={room} firebaseRef={firebase.database().ref().child('rooms')} />
      </div>
    );
  }
}

DirectMessage.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default DirectMessage;