import React from 'react';
import PropTypes from 'prop-types';
import appendReactDOM from 'append-react-dom';
import moment from 'moment';

import Message from './message'
import Image from './image'
import CommentField from '../../components/commentField'
import MessageWithImage from './messageWithImage'

class Room extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      openDate: moment()
    };

    this._roomName = this._roomName.bind(this);
    this._sendText = this._sendText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (openDate){
    if (moment().isAfter(openDate)) {
      openDate = moment();
    }

    this.setState({ openDate: openDate });
  }

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
          // appendReactDOM(Message, el, {
          //   text: childData.message,
          //   className: className
          // });
          if(itemsProcessed === length) {
            el.scrollTo(0, el.scrollHeight - el.clientHeight);
          }
        })
      });

      firebaseRef.child(currentRoom.room_key).on('child_added',function(snapshot){
        let className =  snapshot.val().user_id == currentUser.id ? 'mine' : null
        if(snapshot.val().hasOwnProperty('image') && snapshot.val().message != ""){
          appendReactDOM(MessageWithImage, el, {
            src: snapshot.val().image.url,
            text: snapshot.val().message,
            className: className
          });
        } else if(snapshot.val().hasOwnProperty('image')){
          appendReactDOM(Image, el, {
            src: snapshot.val().image.url,
            className: className
          });
        } else {
          appendReactDOM(Message, el, {
            text: snapshot.val().message,
            className: className
          });
        }

        el.scrollTo(0, el.scrollHeight - el.clientHeight);
      })
    }
  }

  _roomName(room){
    let {currentUser} = this.context;

    if (room.name) return room.name

    return room.users.filter(user => user.id != currentUser.id)[0].name;
  }

  _sendText(e, imageLink) {
    let code = (e.keyCode ? e.keyCode : e.which);
    let el = document.getElementsByClassName('message-container')[0]

    if (code == 13) {
      e.preventDefault();

      let {currentUser} = this.context;
      let {currentRoom, firebaseRef} = this.props

      let messageField = document.getElementsByTagName('textarea')[0]

      let messageObjet = {
        user_id: currentUser.id,
        message: messageField.value
      }

      if(imageLink.length){
        messageObjet['image'] = {url: imageLink}
      }

      firebaseRef.child(currentRoom.room_key).push(messageObjet);

      messageField.value = ''
    }

    el.scrollTo(0, el.scrollHeight - el.clientHeight);
  }

  render() {
    let {currentRoom} = this.props;

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
              <CommentField containerClass="col-8"
                            openDate={this.state.openDate}
                            sendTextHandler={this._sendText}
                            openDateChangeHandler={this.handleChange}
                            buttonText="Post" />
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