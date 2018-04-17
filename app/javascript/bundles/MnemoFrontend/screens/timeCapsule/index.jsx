import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from '../feed/categoryList'
import DetailSection from './detail';
import MediaSection from './media';
import MemoryBoxForm from '../../components/memoryBoxForm';
import MemoryBoxesSection from './memoryBox';
import Image from '../../components/image'

const initialState = {
  fetchedCapsule: false
};

class TimeCapsule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._sendText = this._sendText.bind(this);
    this._resetForm = this._resetForm.bind(this);

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

  _sendText(e, memoryBoxDetail) {
    e.preventDefault();

    let {actions} = this.props;
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;

    memoryBoxDetail['medium'] = this.props.timeCapsule.media.medium;

    actions.createMemoryBox(timeCapsule.id, memoryBoxDetail)
  }

  _resetForm() {
    let {actions} = this.props;

    actions.resetMedium();
  }

  render() {
    let {fetchedCapsule} = this.state;
    let {actions} = this.props
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;
    let {medium} = this.props.timeCapsule.media

    return (
      <div className="row">
        <CategoryList />
        <div className="time-capsule-section list col-9">
          { fetchedCapsule ?
          <div className="time-capsule-container">
            <div className="profile">
              <Image src={timeCapsule.user.image} size="xs" classNames="circle"/>
            </div>
                <div className="capsule-detail-group">
                  <DetailSection timeCapsule={timeCapsule} />
                  <MediaSection timeCapsule={timeCapsule} />
                  <MemoryBoxForm sendTextHandler={this._sendText}
                                 buttonText={"Add Memory Box"}
                                 medium={medium}
                                 actions={actions}
                                 timeCapsule={this.props.timeCapsule.timeCapsule} resetFormHandler={this._resetForm} />
                  <MemoryBoxesSection memoryBoxes={this.props.timeCapsule.timeCapsule.memoryBoxes} />
                </div>
          </div>
            : null

          }
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