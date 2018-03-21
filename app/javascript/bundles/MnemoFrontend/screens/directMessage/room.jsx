import React from 'react';

export default class Room extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {friends} = this.props.directMessage.friend;

    return (
    <div className="col-9">
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
    );
  }
}
