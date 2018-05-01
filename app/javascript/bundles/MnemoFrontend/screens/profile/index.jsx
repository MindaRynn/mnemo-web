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
      fetchedUserCapsule: false,
      getUserSuccess: false,
      fetchedParticipatedCapsule: false,
      currentShowCapsule: "yours"
    }

    this.handleChange = this.handleChange.bind(this);
    this.wrapDateChangeHandler = this.wrapDateChangeHandler.bind(this);
    this.openDateChangeHandler = this.openDateChangeHandler.bind(this);
    this._sendText = this._sendText.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setShowCapsule = this.setShowCapsule.bind(this);
    this._checkTimeOver = this._checkTimeOver.bind(this);
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

    if(this._checkTimeOver(capsuleDetail)) {
      document.getElementById("timeOverButton").click();
    } else {
      let {actions} = this.props;
      let {currentUser} = this.context;

      if(capsuleDetail.currentTime.isAfter(this.state.wrapDate)) {
        this.setState({
          wrapDate: capsuleDetail.currentTime
        }, () => {
      capsuleDetail['wrapDate'] = this.state.wrapDate.toDate();
      capsuleDetail['openDate'] = this.state.openDate.toDate();
      capsuleDetail['medium'] = this.props.profile.media.medium;

      actions.createTimeCapsule(currentUser.id, capsuleDetail)
      window.location.reload();
        })
      } else {
        capsuleDetail['wrapDate'] = (this.state.wrapDate.add(1, 'seconds')).toDate();
        capsuleDetail['openDate'] = this.state.openDate.toDate();
        capsuleDetail['medium'] = this.props.medium;

        actions.createTimeCapsule(currentUser.id, capsuleDetail)
        window.location.reload();
      }
    }
  }

  _resetForm() {
    let {actions} = this.props;

    actions.resetMedium();

    this.setState({
      wrapDate: moment(),
      openDate: moment()
    });
  }

  _checkTimeOver(capsuleDetail) {
    return capsuleDetail.currentTime.diff(this.state.openDate) >= 0;
  }

  componentDidMount() {
    let {actions} = this.props;
    let {currentUser} = this.context;
    let {id} = this.props.params

    if (!!id) {
      actions.getUser(id);
    } else {
      actions.fetchUserTimeCapsule(currentUser.id);
      actions.fetchParticipatedTimeCapsule();
      actions.fetchTags();
    }
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess, fetchParticipatedTimeCapsuleSuccess} = this.props.profile.timeCapsule
    let {actions} = this.props

    let {getUserSuccess} = this.props.profile.user

    if(fetchTimeCapsuleSuccess && !prevProps.profile.timeCapsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedUserCapsule: true,
      });
    }
    if(fetchParticipatedTimeCapsuleSuccess && !prevProps.profile.participatedTimeCapsule.fetchParticipatedTimeCapsuleSuccess) {
      this.setState({
        fetchedParticipatedCapsule: true,
      });
    }

    if(getUserSuccess && !prevProps.profile.user.getUserSuccess) {
      this.setState({
        getUserSuccess: true,
      });

      actions.fetchUserTimeCapsule(this.props.params.id);
    }
  }

  _renderTimeCapsule() {
    let {userTimeCapsules} = this.props.profile.timeCapsule;
    let {participatedTimeCapsules} = this.props.profile.timeCapsule;
    let {actions} = this.props;
    let timeCapsules = this.state.currentShowCapsule == "yours" ? userTimeCapsules : participatedTimeCapsules

    let shownUser = this.props.params.id ? this.props.profile.user.user : this.context.currentUser

    return (
      <div>
        {timeCapsules.map((timeCapsule, index) => {
          let wrapDate = new moment(timeCapsule.wrap_date);
          let openDate = new moment(timeCapsule.open_date);
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
                       currentUser={shownUser}
                       avatar={timeCapsule.user.image}
                       name={timeCapsule.user.name}
                       timeCapsule={timeCapsule}
                       actions={actions} />);
        })}
      </div>
    );
  }

  setShowCapsule(e,state) {
    e.preventDefault()
    this.setState({
      currentShowCapsule: state
    })
  }

  render() {
    let {actions, profile} = this.props;
    let {timeCapsule} = profile;
    let {medium} = profile.media;
    let {fetchedUserCapsule, getUserSuccess} = this.state
    let {currentUser} = this.context;

    let userProfileId = this.props.params.id

    let shownUser = !!userProfileId ? this.props.profile.user.user : currentUser

    return (
      <div>

        { (userProfileId && getUserSuccess) || !!!userProfileId ?
          <div className="profile-container">
            <div className="row">
              <div className="col-4" >
                <center><Image size="l" src={ shownUser.image}/></center>
              </div>
              <div className="col-5">
                <div className="row"><h2>{shownUser.name}</h2></div>
                <div className="row"><p>{shownUser.bio}</p></div>
              </div>
            </div>
            <hr/>
            {
              (userProfileId != currentUser.id) ? null :
                <div>
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
                               timeCapsule={timeCapsule}
                               tags={profile.tag.tags}
                  />
                  <div className="row">
                    <div className="col-8">
                      <ul className="nav">
                        <li className="space-item"><a data-toggle="tab" onClick={e => this.setShowCapsule(e,"yours")} href="#menu1" className="space-toggle active show">Yours</a></li>
                        <li className="space-item"><a data-toggle="tab" onClick={e => this.setShowCapsule(e,"joined")} href="#menu2" className="space-toggle">Joined</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
            }

            <div className="add-data">
              <input id="timeOverButton" style={{ display: "none" }} data-toggle="modal" data-target="#timeover"/>
            </div>
            <div className="modal fade" id="timeover" tabIndex="-1" role="dialog" aria-labelledby="timeover" aria-hidden="true">
              <div id="timeOverModal" className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-body text-center">
                    <h2>Open time invalid</h2>
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            {fetchedUserCapsule ? this._renderTimeCapsule() : null}
          </div> : null
        }
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