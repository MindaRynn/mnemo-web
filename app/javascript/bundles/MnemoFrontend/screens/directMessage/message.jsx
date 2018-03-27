import React from 'react';

class Message extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {text, className} = this.props;

    return (

      <div className={`message-group ${className ? className : ''}`}>
        <div className="message">
          <span>{text}</span>
        </div>
      </div>

    );
  }
}

export default Message;