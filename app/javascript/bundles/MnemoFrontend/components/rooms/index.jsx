import React from 'react';
import ContactList from './contactList'

export default class DirectMessagePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {friends} = this.props;
    return (
      <div className="row">
        <div className="col-4">
          <ul className="nav">
            <li><a data-toggle="tab" href="#menu1">Contact</a></li>
            <li><a data-toggle="tab" href="#menu2">Message</a></li>
          </ul>

          <div className="tab-content">
            <ContactList />
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
