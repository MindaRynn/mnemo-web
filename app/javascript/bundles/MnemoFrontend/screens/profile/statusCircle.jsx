import React from 'react';

const colors = {
  JOINED: "#FFA700",
  WAITING: "rgba(56,56,56,0.2)",
  READY: "#00C38E"
}

class StatusCircle extends React.Component {
  
  render() {
    let color = colors[this.props.status];
    const circleStyle = {
      backgroundColor: color,
      borderRadius: 50,
      width: 14,
      height: 14,
      marginTop: 4,
      marginLeft: 5,
      display: "inline-block"
    }

    return (
      <div style={circleStyle}></div>
    );
  }
}

export default StatusCircle;