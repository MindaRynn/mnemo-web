import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config/';
import Image from '../../components/image/';
import PrimaryButton from '../../components/buttons/primaryButton';
import Capsule from './capsule'

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

  createCapsule = () => {
    let capsule = [];
    for(let i = 0; i < 4; i++) {
      capsule.push(
        <div key={i.toString()} className="col-4">
          <Capsule name={this.state.name} date="20 jan 2018" file={this.state.avatar} like="50" comment="hello" view="30"/>
        </div>
      )
    }
    return capsule;
  }

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
              <label htmlFor="file" style={{ marginBottom: "0px" }} id="upload-icon" className="btn align-middle"><i className="fa fa-image"></i></label>

              <input style={{ display: "none" }} id="file" type="file" name="file"/>
            </div>
          </div>
          <ul className="nav">
            <li className="space-item"><a data-toggle="tab" href="#menu1" className="space-toggle active show">All</a></li>
            <li className="space-item"><a data-toggle="tab" href="#menu2" className="space-toggle">Opened</a></li>
          </ul>
          
          <div className="row">
            {this.createCapsule()}
          </div>
          
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