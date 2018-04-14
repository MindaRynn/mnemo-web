import React from "react";

const types = {
  notification: 95,
  standard: 150,
  post: 60
};

class Image extends React.Component {
  render() {
    let size = types[this.props.type] || types.standard;
    let { src, classNames } = this.props;

    const imageStyle = {
      width: size,
      height: size,
      backgroundImage: `url(${src})`
    }

    return (
      <div className={`img img-border ${classNames ? classNames : ''}`} style={imageStyle} ></div>
    );
  }
}

export default Image;
/**
 *
 * <Image type="standard" src="http://..." />
 * <Image type="post" src="http://..." />
 */
