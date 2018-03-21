import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import ContactList from './contactList'
import Room from './room'
import config from '../../config/';

const initialState = {
  fetchedFriend: false,
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
  }

  componentDidUpdate(prevProps) {
    let {fetchFriendSuccess, friends} = this.props.directMessage.friend

    if(fetchFriendSuccess && !prevProps.directMessage.friend.fetchFriendSuccess) {
      this.setState({
        fetchedFriend: true,
        currentRoomKey: friends[0].room_key
      });
    }
  }

  _setRoom(roomKey) {
    console.log('---------------')
    console.log(roomKey)
    console.log('---------------')
  }

  render() {
    let {directMessage} = this.props
    let {fetchedFriend, currentRoomKey} = this.state;

    return (
    <div>
      {fetchedFriend ?
        <div className="row">
          <div className="col-3">
            <div className="title-container">
              <ul className="nav">
                <li><a data-toggle="tab" href="#menu1" className="active show">Contact</a></li>
                <li><a data-toggle="tab" href="#menu2">Message</a></li>
              </ul>
            </div>

            <div className="tab-content">
              <ContactList directMessage={directMessage} currentRoomKey={currentRoomKey} itemClickHandler={this._setRoom} firebase={firebase} />
              <div id="menu2" className="tab-pane fade">
                <ul className="contact-list">
                </ul>
              </div>
            </div>
          </div>
          <Room directMessage={directMessage} />
        </div> : null
      }
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