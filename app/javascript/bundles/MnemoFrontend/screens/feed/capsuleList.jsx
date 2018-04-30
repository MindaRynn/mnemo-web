import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CapsuleForm from '../../components/capsuleForm'
import ContainerSwtichCapsule from '../../components/timeCapsuleItem/containerSwitchCapsule';

class CapsuleList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      wrapDate: moment(),
      openDate: moment(),
      fetchedCapsule: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.wrapDateChangeHandler = this.wrapDateChangeHandler.bind(this);
    this.openDateChangeHandler = this.openDateChangeHandler.bind(this);
    this._sendText = this._sendText.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this._checkTimeOver = this._checkTimeOver.bind(this);
  }

  componentDidUpdate(prevProps) {
    let {fetchTimeCapsuleSuccess} = this.props.timeCapsule

    if(fetchTimeCapsuleSuccess && !prevProps.timeCapsule.fetchTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }
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

  _resetForm() {
    let {actions} = this.props;

    actions.resetMedium();

    this.setState({
      wrapDate: moment(),
      openDate: moment()
    });

  }

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
          capsuleDetail['wrapDate'] = (this.state.wrapDate.add(1, 'seconds')).toDate();
          capsuleDetail['openDate'] = this.state.openDate.toDate();
          capsuleDetail['medium'] = this.props.medium;

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

  _checkTimeOver(capsuleDetail) {
    return capsuleDetail.currentTime.diff(this.state.openDate) >= 0;
  }

  _rederTimeCapsule(){
    let {actions} = this.props;
    let {timeCapsules} = this.props.timeCapsule;

    return (
      <div>
        {timeCapsules.map((timeCapsule, index) => {
          return (<ContainerSwtichCapsule status={status} key={index}
                      currentUser={this.context.currentUser}
                       avatar={timeCapsule.user.image}
                       name={timeCapsule.user.name}
                       timeCapsule={timeCapsule}
                       actions={actions}/>);
        })}
      </div>
    );
  }

  render() {
    let {actions, medium, timeCapsule} = this.props;

    return (
      <div className="list col-9">
        <CapsuleForm wrapDateChangeHandler={this.wrapDateChangeHandler}
                     openDateChangeHandler={this.openDateChangeHandler}
                     openDate={this.state.openDate}
                     wrapDate={this.state.wrapDate}
                     buttonText="Create Time Capsule"
                     actions={actions}
                     resetFormHandler={this._resetForm}
                     medium={medium}
                     sendTextHandler={this._sendText}
                     timeCapsule={timeCapsule} />
        
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

        {this._rederTimeCapsule()}
      </div>
    );
  }
}

CapsuleList.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default CapsuleList;