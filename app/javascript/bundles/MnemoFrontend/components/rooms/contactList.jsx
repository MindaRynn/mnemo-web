import React from 'react';

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {friendList, className} = this.props;

    return (
      <div id="menu1" className="tab-pane fade active show">
        <ul className="contact-list">
          <li className="contact-item">
            <div className="item-group">
              <div className="avatar"></div>
              <div className="profile-container">
                Natcha Pongsupanee
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
