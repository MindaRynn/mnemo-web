import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import CategoryList from '../feed/categoryList'
import DetailSection from './detail';
import MediaSection from './media';
import MemoryBoxForm from '../../components/memoryBoxForm';
import CapsuleForm from '../../components/capsuleForm'
import MemoryBoxesSection from './memoryBox';
import Image from '../../components/image'

const initialState = {
  fetchedCapsule: false
};

class TimeCapsule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      wrapDate : moment(),
      openDate: moment(),
      isEditing: false
    };

    this._sendText = this._sendText.bind(this);
    this._updateTimeCapsule = this._updateTimeCapsule.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.wrapDateChangeHandler = this.wrapDateChangeHandler.bind(this);
    this.openDateChangeHandler = this.openDateChangeHandler.bind(this);
    this._editOnClickHandler = this._editOnClickHandler.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    let {actions, params} = this.props;
    actions.getTimeCapsule(params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    let {getTimeCapsuleSuccess, updateTimeCapsuleSuccess} = this.props.timeCapsule.timeCapsule;
    let {fetchedCapsule} = this.state;
    let {actions} = this.props;
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;

    if(getTimeCapsuleSuccess && !prevProps.timeCapsule.timeCapsule.getTimeCapsuleSuccess) {
      this.setState({
        fetchedCapsule: true,
      });
    }

    if(fetchedCapsule && !prevState.fetchedCapsule) {
      timeCapsule.memory_boxes[0].medium.forEach(function (media) {
        actions.addMedia(media.media_url)
      });

      this.setState({
        wrapDate : moment(timeCapsule.wrap_date),
        openDate: moment(timeCapsule.open_date)
      });
    }

    if(updateTimeCapsuleSuccess && !prevProps.timeCapsule.timeCapsule.updateTimeCapsuleSuccess) {
      actions.resetMedium();

      timeCapsule.memory_boxes[0].medium.forEach(function (media) {
        actions.addMedia(media.media_url)
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

  _sendText(e, memoryBoxDetail) {
    e.preventDefault();

    let {actions} = this.props;
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;

    memoryBoxDetail['medium'] = this.props.timeCapsule.media.medium;

    actions.createMemoryBox(timeCapsule.id, memoryBoxDetail)
  }

  _updateTimeCapsule(e, timeCapsuleDetail) {
    let {actions} = this.props
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;
    let {medium} = this.props.timeCapsule.media

    timeCapsuleDetail['wrapDate'] = this.state.wrapDate.toDate();
    timeCapsuleDetail['openDate'] = this.state.openDate.toDate();
    timeCapsuleDetail['medium'] = medium;

    actions.updateTimeCapsule(timeCapsule.id, timeCapsuleDetail)

    this.setState({
      isEditing: false
    })
  }

  _editOnClickHandler(e){
    this.setState({
      isEditing: true
    })
  }

  _resetForm() {
    let {actions} = this.props;

    actions.resetMedium();
  }

  render() {
    let {currentUser} = this.context;
    let {fetchedCapsule, isEditing} = this.state;
    let {actions} = this.props
    let {timeCapsule} = this.props.timeCapsule.timeCapsule;
    let {medium} = this.props.timeCapsule.media
    let memoryBoxes = this.props.timeCapsule.timeCapsule.memoryBoxes;

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
                  {
                    isEditing ? null :
                      <DetailSection timeCapsule={timeCapsule}
                                     isEditing={isEditing}
                                     editOnClickHandler={this._editOnClickHandler}/>
                  }

                  {
                    this.props.timeCapsule.timeCapsule.timeCapsule.memory_boxes[0].medium.length <= 0 || isEditing ?
                      null : <MediaSection timeCapsule={timeCapsule} />
                  }

                  {
                    isEditing ?
                      <CapsuleForm wrapDateChangeHandler={this.wrapDateChangeHandler}
                                   openDateChangeHandler={this.openDateChangeHandler}
                                   openDate={this.state.openDate}
                                   wrapDate={this.state.wrapDate}
                                   buttonText="Update Time Capsule"
                                   actions={actions}
                                   resetFormHandler={this._resetForm}
                                   medium={medium}
                                   sendTextHandler={this._updateTimeCapsule}
                                   timeCapsule={timeCapsule}
                                   memoryBoxes={memoryBoxes}
                                   typeEdit={true}/> : null
                  }

                  { currentUser.id == timeCapsule.user.id ?
                    null :
                    <MemoryBoxForm sendTextHandler={this._sendText}
                                   buttonText={"Add Memory Box"}
                                   medium={medium}
                                   actions={actions}
                                   timeCapsule={this.props.timeCapsule.timeCapsule} resetFormHandler={this._resetForm} />
                  }
                  {
                    memoryBoxes.length <= 0 ?
                      null :  <MemoryBoxesSection memoryBoxes={memoryBoxes} />
                  }
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