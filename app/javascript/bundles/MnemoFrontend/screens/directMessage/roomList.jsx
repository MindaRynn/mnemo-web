import React from 'react';
import PropTypes from 'prop-types';

class RoomList extends React.Component {

  constructor(props) {
    super(props)

    this._fetchRoom = this._fetchRoom.bind(this);
  }

  _fetchRoom(e, room_key){
    e.preventDefault();
  }

  render() {
    let {rooms} = this.props

    return (
      <div id="menu2" className="tab-pane fade">
          <ul className="contact-list">
            {rooms.map((room, index) => {

              return (
                <li key={index} className="contact-item" onClick={e => this._fetchRoom(e, room.room_key)}>
                  <div className="item-group">
                    <div className="avatar"></div>
                    <div className="profile-container">
                      {room.name}
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