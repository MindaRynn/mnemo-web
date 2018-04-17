import React from "react";

const types = {
  xs:50,
  s: 60,
  m: 95,
  l: 120,
  lx: 150
};

class Image extends React.Component {
  render() {
    let size = types[this.props.size] || types.lx;
    let { src, classNames } = this.props;

    const imageStyle = {
      width: size,
      height: size,
      backgroundImage: `url(${src})`
    }

    return (
      <div className={`img img-border img-fluid ${classNames ? classNames : ''}`} style={imageStyle} ></div>

    );
  }
}

export default Image;
/**
 *
 * <Image type="standard" src="http://..." />
 * <Image type="post" src="http://..." />
 */
