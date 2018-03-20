import React from 'react';

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {friends} = this.props.directMessage.friend;
    let {currentRoomKey} =  this.props;

    return (
      <div id="menu1" className="tab-pane fade active show">
        <ul className="contact-list">
          {friends.map((friend, index) => {

            return (
              <li key={index} className="contact-item">
                <div className={ `item-group ${friend.room_key == currentRoomKey ? 'selected' : ''}` }>
                  <div className="avatar"></div>
                  <div className="profile-container">
                    {friend.name}
                  </div>
                </div>
              </li>

            );
          })}
        </ul>
      </div>
    );
  }
}
