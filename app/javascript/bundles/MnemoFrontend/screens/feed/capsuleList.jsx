import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CapsuleForm from '../../components/capsuleForm'
import Capsule from '../../components/timeCapsuleItem/capsule'

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

    let {actions} = this.props;
    let {currentUser} = this.context;

    capsuleDetail['wrapDate'] = this.state.wrapDate.toDate();
    capsuleDetail['openDate'] = this.state.openDate.toDate();
    capsuleDetail['medium'] = this.props.medium;

    actions.createTimeCapsule(currentUser.id, capsuleDetail)
  }

  _rederTimeCapsule(){
    let {timeCapsules} = this.props.timeCapsule;

    return (
      <div>
        {timeCapsules.map((timeCapsule, index) => {
          return (
            <Capsule key={index}
                     avatar={this.context.currentUser.image}
                     name={this.context.currentUser.name}
                     capsule={timeCapsule}/>
          );
        })}
      </div>
    );
  }

  render() {
    let {actions, medium, timeCapsule} = this.props;
    let {fetchedCapsule} = this.state

    return (
      <div className="list col-9">
        <CapsuleForm hasOpenTime={true}
                     hasWrapTime={true}
                     wrapDateChangeHandler={this.wrapDateChangeHandler}
                     openDateChangeHandler={this.openDateChangeHandler}
                     openDate={this.state.openDate}
                     wrapDate={this.state.wrapDate}
                     buttonText="Create Time Capsule"
                     actions={actions}
                     resetFormHandler={this._resetForm}
                     medium={medium}
                     sendTextHandler={this._sendText}
                     timeCapsule={timeCapsule} />

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