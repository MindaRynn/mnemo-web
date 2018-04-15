import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config/';
import Image from '../../components/image/';
import PrimaryButton from '../../components/buttons/primaryButton';
import Capsule from './capsule';
import CommentField from '../../components/commentField/';
import moment from 'moment';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      avatar: this.context.currentUser.image,
      bio: this.context.currentUser.bio,
      name: this.context.currentUser.name,
      startDate: moment(),
      endDate: moment(),
      fetchedCapsule: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChange ({ startDate, endDate }){
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  }

  handleChangeStart (startDate) { this.handleChange({ startDate }); }

  handleChangeEnd (endDate) { this.handleChange({ endDate }); }

  componentDidMount() {
    let {currentUser} = this.context;
    let {actions} = this.props;

    actions.fetchTimeCapsule(currentUser.memory_boxes);
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess} = this.props.profile.capsule

    if(fetchTimeCapsuleSuccess && !prevProps.profile.capsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }
  }

  createCapsule = () => {
    let capsules = [];
    this.props.profile.capsule.timeCapsules.map((capsule) => {
      capsules.push(
        <Capsule key={capsule.id} avatar={this.state.avatar} name={this.state.name} capsule={capsule}/>
      );
    });
    return capsules;
  }

  render() {
    let {profile} = this.props
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
          <CommentField containerClass="col-12"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        startDateChangeHandler={this.handleChangeStart}
                        endDateChangeHandler={this.handleChangeEnd}
                        sendTextHandler={this._sendText}/>
          <ul className="nav">
            <li className="space-item"><a data-toggle="tab" href="#menu1" className="space-toggle active show">All</a></li>
            <li className="space-item"><a data-toggle="tab" href="#menu2" className="space-toggle">Opened</a></li>
          </ul>
          
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