import React from 'react';

const colors = {
  JOINED: "#FFA700",
  OPENNED: "rgba(56,56,56,0.2)",
  READY: "#00C38E",
  AVAILABLE: "#FFFAF2"
}

class StatusCircle extends React.Component {
  
  render() {
    let {status} = this.props;
    let color = colors[status];

    const circleStyle = {
      backgroundColor: color,
      borderRadius: "50%",
      width: 9,
      height: 9,
      marginLeft: 5,
      display: "inline-block"
    }

    if(status == "AVAILABLE") {
      circleStyle['borderColor'] = '#FFA700'
      circleStyle['borderWidth'] = 1
      circleStyle['borderStyle'] = 'solid'
    }

    return (
      <div style={circleStyle}></div>
    );
  }
}

export default StatusCircle;