import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from '../feed/categoryList'

const initialState = {
  fetchedCapsule: false
};

class TimeCapsule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = initialState;
  }

  componentDidMount() {
    let {actions, params} = this.props;
    actions.getTimeCapsule(params.id);
  }

  componentDidUpdate(prevProps) {
    let {getTimeCapsuleSuccess} = this.props.timeCapsule.timeCapsule

    if(getTimeCapsuleSuccess && !prevProps.timeCapsule.timeCapsule.getTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }
  }

  render() {
    let {fetchedCapsule} = this.state;

    return (
      <div className="row">
        <CategoryList />
        { fetchedCapsule ?
          <div className="time-capsule-section list col-9">
            <div className="time-capsule-container">
              <div className="profile"></div>
              <div className="capsule-detail-group">

              </div>
            </div>
          </div>
           : null
        }
      </div>
    );
  }
}

TimeCapsule.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default TimeCapsule;