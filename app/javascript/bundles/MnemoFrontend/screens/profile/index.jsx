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
        <div className="row">
          <div className="col-4 text-center">
            <Image type="standard" src={this.state.avatar}/>
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
        <input className="w-100" type="text" placeholder="Writing something.."/>
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