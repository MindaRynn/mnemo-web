import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../components/image/'

class RoomList extends React.Component {

  constructor(props) {
    super(props)

    // this._fetchRoom = this._fetchRoom.bind(this);
  }

  // _fetchRoom(e, room_key){
  //   e.preventDefault();
  // }

  render() {
    let {rooms, currentRoomKey, itemClickHandler} = this.props

    return (
      <div id="menu2" className="tab-pane fade">
          <ul className="contact-list">
            {rooms.map((room, index) => {
              let friend = room.users.filter(user => user.id != this.context.currentUser.id)
              return (
                <li key={index} className="contact-item" onClick={e => itemClickHandler(e, friend[0].id)}>
                  <div className={ `item-group ${room.room_key == currentRoomKey ? 'selected' : ''}` }>
                    <Image size="s" src={friend[0].image}/>
                    <div className="profile-container">
                      {friend[0].name}
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

RoomList.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default RoomList;
