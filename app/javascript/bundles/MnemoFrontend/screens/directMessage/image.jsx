import React from 'react';

export default class Image extends React.Component {
  render() {
    let {src, className} = this.props;
    const sizeStyle = {
      height: 200
    }

    return (
      <div className={`message-group ${className ? className : ''}`}>
       <div className="message">
        <img style={sizeStyle} className="img-fluid" src={src} alt=""/>
       </div>
      </div>
    );
  }
}