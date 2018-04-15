import React from 'react';

class MessageWithImage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {src, text, className} = this.props;
    const sizeStyle = {
      height: 200
    }

    return (

      <div className={`message-group ${className ? className : ''}`}>
        <div className="message text-right">
          <span>{text}</span><br/>
          <img style={sizeStyle} className="img-fluid" src={src} alt=""/>
        </div>
      </div>

    );
  }
}

export default MessageWithImage;