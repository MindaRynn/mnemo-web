import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../components/image/';
import PrimaryButton from '../../components/buttons/primaryButton';
import CapsuleForm from '../../components/capsuleForm'
import ContainerSwtichCapsule from '../../components/timeCapsuleItem/containerSwitchCapsule';
import moment from 'moment';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
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

  _renderTimeCapsule(){
    let {timeCapsules} = this.props.profile.timeCapsule;

    return (
      <div>
        {timeCapsules.map((timeCapsule, index) => {
          let wrapDate = new moment(timeCapsule.wrap_date.toLocaleString());
          let openDate = new moment(timeCapsule.open_date.toLocaleString());
          let currentTime = new moment();
          let diffTime1 = wrapDate.diff(currentTime)
          let diffTime2 = openDate.diff(currentTime)
          let isNotWaiting = diffTime1 > 0 || diffTime2 < 0;
          let status = ""
          if(isNotWaiting) {
            status = "isNotWaiting"
          } else {
            status = "isWaiting"
          }
          
          return (<ContainerSwtichCapsule status={status} key={index}
                       avatar={this.context.currentUser.image}
                       name={this.context.currentUser.name}
                       timeCapsule={timeCapsule} />);
        })}
      </div>
    );
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
              <center><Image size="lx" src={this.context.currentUser.image}/></center>
            </div>
            <div className="col-5">
              <div className="row"><h2>{this.context.currentUser.name}</h2></div>
              <div className="row"><p>{this.context.currentUser.bio}</p></div>
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
          
          {fetchedCapsule ? this._renderTimeCapsule() : null}
          
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