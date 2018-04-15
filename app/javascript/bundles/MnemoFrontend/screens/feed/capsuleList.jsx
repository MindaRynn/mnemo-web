import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CapsuleForm from '../../components/capsuleForm'

class CapsuleList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      wrapDate: moment(),
      openDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.wrapDateChangeHandler = this.wrapDateChangeHandler.bind(this);
    this.openDateChangeHandler = this.openDateChangeHandler.bind(this);
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

  render() {
    let {actions, medium} = this.props;
    return (
      <div className="list col-9">
        <CapsuleForm hasOpenTime={true}
                     hasWrapTime={true}
                     openDate={this.state.openDate}
                     wrapDate={this.state.wrapDate}
                     buttonText="Create Time Capsule"
                     actions={actions}
                     medium={medium} />
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