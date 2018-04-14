import React from 'react'
import Image from '../../components/image/';
import StatusCircle from './statusCircle';

export default class Capsule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: "JOINED"
    }
  }
  render() {
    let {name,avatar,capsule} = this.props

    return (
      <div>
        <div className="row capsule-box">
          
          <div className="col-1"><Image type="post" src={avatar}/></div>
          <div className="col-11">
            <div className="row">
              <div className="col-2"><h3>{name}</h3></div>
              <div className="col-5">March 30 at 10:05pm</div>
              <div className="col-2 text-right">{this.state.status}<StatusCircle status={this.state.status}/></div>
              <div className="col-3 text-right">Wrapped April 4 at 10:05pm</div>
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