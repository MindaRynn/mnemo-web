import React from "react";
import * as firebase from 'firebase';
import Image from '../image'

class Notification extends React.Component {

  constructor(props) {
    super(props);

    // firebase.database().ref().child('notification').child(this.props.currentUser.notification_key).push({
    //   type: 'capsule',
    //   url: 'timeCapsule/2',
    //   seen: false,
    //   notiTime: moment().toDate().toLocaleDateString(),
    //   user: this.props.currentUser
    // })

    this.state = {notifications: [], unseenNum: 0}
  }

  componentDidMount(){
    let notifications = [];
    let _this = this;

    firebase.database().ref()
      .child('notification')
      .child(this.props.currentUser.notification_key)
      .once('value', function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          notifications.push(childSnapshot.val())
        })

        let unseenNum = notifications.filter(notification => !notification.seen).length;

        _this.setState({
          notifications: notifications.reverse(),
          unseenNum: unseenNum
        })
      });

    firebase.database().ref()
      .child('notification')
      .child(this.props.currentUser.notification_key)
      .on('child_added',function(snapshot){
        let newNoti =  snapshot.val()

        _this.setState({
          notifications: [newNoti].concat(_this.state.notifications),
          unseenNum: _this.state.unseenNum + 1
        })

      })
  }

  _clickHandler(e, url) {
    window.location = `/${url}`;
  }

  render() {
    let {notifications, unseenNum} = this.state;
    return (
      <div className="dropdown notification">
        {unseenNum ?
          <div className="notification-number">
            {unseenNum}
          </div> : null}
        <a id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Notification
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {notifications.length > 0 ?
            notifications.map((notification, index) => {

            return (
              <div key={index} className={`notification-item ${notification.seen ? 'seen' : ''}`} onClick={e => this._clickHandler(e, notification.url)}>
                <div>
                  <Image src={notification.user.image} size="xxs" classNames="circle" />
                  <div className="detail">One Capsule is ready to Open</div>
                </div>
                <div className="datetime">{notification.notiTime}</div>
              </div>
            );
          }) :
            <div className="no-notification">
              You don't have any Notification
            </div>}
        </div>
      </div>
    );
  }
}

export default Notification;