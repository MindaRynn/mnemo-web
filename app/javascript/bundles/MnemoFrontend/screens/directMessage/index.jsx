import React from 'react';
import PropTypes from 'prop-types';
import ContactList from './contactList'

export default class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;

    actions.fetchUserFriend(currentUser.id);
  }

  render() {
    let {directMessage} = this.props
    return (
      <div className="row">
        <div className="col-4">
          <div className="title-container">
            <ul className="nav">
              <li><a data-toggle="tab" href="#menu1">Contact</a></li>
              <li><a data-toggle="tab" href="#menu2">Message</a></li>
            </ul>
          </div>

          <div className="tab-content">
            <ContactList directMessage={directMessage} />
            <div id="menu2" className="tab-pane fade">
              <h3>Message</h3>
              <p>Message list</p>
            </div>
          </div>
        </div>
        <div className="col-8">
          Chat
        </div>
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
