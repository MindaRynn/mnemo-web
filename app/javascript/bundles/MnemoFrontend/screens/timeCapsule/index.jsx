import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CategoryList from '../feed/categoryList'
import DetailSection from './detail';
import MediaSection from './media';

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
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;

    return (
      <div className="row">
        <CategoryList />
        <div className="time-capsule-section list col-9">
          <div className="time-capsule-container">
            <div className="profile">Pro</div>
              { fetchedCapsule ?
                <div className="capsule-detail-group">
                  <DetailSection timeCapsule={timeCapsule} />
                  <MediaSection timeCapsule={timeCapsule} />
                </div>
                : null

              }
          </div>
        </div>
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