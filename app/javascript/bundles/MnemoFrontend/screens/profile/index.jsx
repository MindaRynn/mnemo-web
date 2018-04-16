import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../components/image/';
import PrimaryButton from '../../components/buttons/primaryButton';
import Capsule from './capsule';
import CapsuleForm from '../../components/capsuleForm'
import moment from 'moment';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      avatar: this.context.currentUser.image,
      bio: this.context.currentUser.bio,
      name: this.context.currentUser.name,
      wrapDate: moment(),
      openDate: moment(),
      fetchedCapsule: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.wrapDateChangeHandler = this.wrapDateChangeHandler.bind(this);
    this.openDateChangeHandler = this.openDateChangeHandler.bind(this);
    this._sendText = this._sendText.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange ({ wrapDate, openDate }){
    wrapDate = wrapDate || this.state.wrapDate;
    openDate = openDate || this.state.openDate;

    if (wrapDate.isAfter(openDate)) {
      openDate = wrapDate;
    }

    this.setState({ wrapDate, openDate });
  }

  wrapDateChangeHandler (wrapDate) { this.handleChange({ wrapDate }); }

  openDateChangeHandler (openDate) { this.handleChange({ openDate }); }

  _sendText(e, capsuleDetail) {
    e.preventDefault();

    let {actions} = this.props;
    let {currentUser} = this.context;

    capsuleDetail['wrapDate'] = this.state.wrapDate.toDate();
    capsuleDetail['openDate'] = this.state.openDate.toDate();
    capsuleDetail['medium'] = this.props.profile.media.medium;

    actions.createTimeCapsule(currentUser.id, capsuleDetail)
  }

  _resetForm() {
    let {actions} = this.props;

    actions.resetMedium();

    this.setState({
      wrapDate: moment(),
      openDate: moment()
    });

  }

  componentDidMount() {
    let {actions} = this.props;

    actions.fetchTimeCapsule();
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess} = this.props.profile.timeCapsule

    if(fetchTimeCapsuleSuccess && !prevProps.profile.timeCapsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }
  }

  createCapsule = () => {
    let capsules = [];
    this.props.profile.timeCapsule.timeCapsules.map((timeCapsule) => {
      capsules.push(
        <Capsule key={timeCapsule.id} avatar={this.state.avatar} name={this.state.name} capsule={timeCapsule}/>
      );
    });
    return capsules;
  }

  render() {
    let {actions, profile} = this.props;
    let {timeCapsule} = profile;
    let {medium} = profile.media;
    let {fetchedCapsule} = this.state

    return (
      <div>
        <div className="profile-container">
          <div className="row">
            <div className="col-4" >
              <center><Image size="lx" src={this.state.avatar}/></center>
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
          <CapsuleForm hasOpenTime={true}
                       hasWrapTime={true}
                       wrapDateChangeHandler={this.wrapDateChangeHandler}
                       openDateChangeHandler={this.openDateChangeHandler}
                       openDate={this.state.openDate}
                       wrapDate={this.state.wrapDate}
                       buttonText="Create Time Capsule"
                       actions={actions}
                       medium={medium}
                       resetFormHandler={this._resetForm}
                       sendTextHandler={this._sendText}
                       timeCapsule={timeCapsule} />
          <div className="row">
            <div className="col-8">
              <ul className="nav">
                <li className="space-item"><a data-toggle="tab" href="#menu1" className="space-toggle active show">All</a></li>
                <li className="space-item"><a data-toggle="tab" href="#menu2" className="space-toggle">Opened</a></li>
              </ul>
            </div>
          </div>
          
          {fetchedCapsule ? this.createCapsule() : null}
          
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