import React from 'react';
import PropTypes from 'prop-types';

const initialState = {
  fetchedRoom: false
};

class RoomList extends React.Component {

  constructor(props) {
    super(props)

    this.state = initialState;
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;

    actions.fetchUserRoom(currentUser.id);
  }

  componentDidUpdate(prevProps) {
    let {fetchRoomSuccess} = this.props.directMessage.room

    if(fetchRoomSuccess && !prevProps.directMessage.room.fetchRoomSuccess) {
      this.setState({
        fetchedRoom: true
      });
    }
  }

  render() {
    let {rooms} = this.props.directMessage.room;
    let {fetchedRoom} = this.state;

    return (
      <div id="menu2" className="tab-pane fade">
        {fetchedRoom ?
          <ul className="contact-list">
            {rooms.map((room, index) => {

              return (
                <li key={index} className="contact-item">
                  <div className="item-group">
                    <div className="avatar"></div>
                    <div className="profile-container">
                      {room.name}
                    </div>
                  </div>
                </li>

              );
            })}
          </ul> : null
        }
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