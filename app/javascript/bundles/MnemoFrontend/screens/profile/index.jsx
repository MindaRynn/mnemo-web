import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config/';
import Image from '../../components/image/';
import PrimaryButton from '../../components/buttons/primaryButton';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      avatar: this.context.currentUser.image,
      bio: this.context.currentUser.bio,
      name: this.context.currentUser.name
    }
  }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;
  }

  componentDidUpdate(prevProps) {}

  render() {
    let {profile} = this.props

    return (
      <div>
        <div className="profile-container">
          <div className="row">
            <div className="col-4" >
              <center><Image type="standard" src={this.state.avatar}/></center>
            </div>
            <div className="col-5">
              <div className="row"><h2>{this.state.name}</h2></div>
              <div className="row"><p>{this.state.bio}</p></div>
            </div>
            <div className="col-3 text-center">
              <PrimaryButton text="Add friends"/>
            </div>
          </div>
          <hr/>
          <div className="row text-center">
            <div className="col-2"></div>
            <div className="col-4">Post <h2 className="sameline">23.5k</h2></div>
            <div className="col-4">Friends <h2 className="sameline">235</h2></div>
            <div className="col-2"></div>
          </div>
          <hr/>
          <div className="input-group">
            <input className="form-control" type="text" placeholder="Writing something.."/>
            <div className="input-group-append">
              <label htmlFor="file" style={{ marginBottom: "0px" }} id="upload-icon" className="btn">Upload</label>
              <input style={{ display: "none" }} id="file" type="file" name="file"/>
            </div>
          </div>
          <ul className="nav">
            <li className="space-item"><a data-toggle="tab" href="#menu1" className="space-toggle active show">All</a></li>
            <li className="space-item"><a data-toggle="tab" href="#menu2" className="space-toggle">Opened</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

Profile.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default Profile;