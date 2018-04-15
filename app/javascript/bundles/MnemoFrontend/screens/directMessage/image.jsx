import React from 'react';

export default class Image extends React.Component {

  render() {
    let {src, className} = this.props;
    const sizeStyle = {
      height: 200
    }

    return (
      <div className={`message-group ${className ? className : ''}`}>
       <div className="message text-right">
          <div className="add-data">
              <a href="" data-toggle="modal" data-target={(`#`+src).toString()}>
                  <img style={sizeStyle} className="img-fluid" src={src} alt=""/>
              </a>
          </div>
          <div className="modal fade" id={(src).toString()} tabIndex="-1" role="dialog" aria-labelledby={(src).toString()} aria-hidden="true">
              <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                      <div className="modal-body">
                          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button><br/>
                          <div className="container-fluid text-center">
                            <img src={src} className="img-fluid" alt=""/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
       </div>
      </div>
    );
  }
}