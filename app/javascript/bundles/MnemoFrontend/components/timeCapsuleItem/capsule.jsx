import React from 'react'
import Image from '../../components/image/';
import StatusCircle from '../../screens/profile/statusCircle';
import moment from 'moment';

export default class Capsule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: this.props.capsule.status == 0 ? "AVAILABLE" : "JOINED",
      created_at: moment(this.props.capsule.created_at.toLocaleString()).format('LLL'),
      wrap_date: moment(this.props.capsule.wrap_date.toLocaleString()).format('LLL')

    }
  }

  render() {
    let {name,avatar,capsule} = this.props

    return (
      <div>
        <div className="row capsule-box">
          
          <div className="col-1"><Image size="s" src={avatar}/></div>
          <div className="col-11">
            <div className="row">
              <div className="col-2"><h3>{name}</h3></div>
              <div className="col-5 font-status-size">{this.state.created_at}</div>
              <div className="col-2 text-right font-status-size">{this.state.status}<StatusCircle status={this.state.status}/></div>
              <div className="col-3 text-right font-status-size">Wrapped {this.state.wrap_date}</div>
            </div>
            <div className="row">
              <div className="col-12 topic-box-color">
                <h3>{capsule.memory_boxes[0].subject}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {capsule.memory_boxes[0].description}
              </div>
            </div>
          </div>
  
        </div>
      </div>
    );
  }
}