import React from 'react'

export default class Capsule extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {name,date,file,like,comment,view} = this.props

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-6"><center><h3>{name}</h3></center></div>
              <div className="col-6"><center>{date}</center></div>
            </div>
          </div>
          <img className="card-img-top" src={file} alt="Card image cap"/>
          <div className="card-body">
            <div className="row">
              <div className="col-4">{like}</div>
              <div className="col-4">{comment}</div>
              <div className="col-4">{view}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}