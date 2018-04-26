import React from 'react'
import Image from './'

export default class ImageModal extends React.Component {
  render() {
    let {src, size} = this.props

    return (
      <div>
        <div className="add-data">
          <a href="" data-toggle="modal" data-target={`#`+src}>
              <Image src={src} size={size} />
          </a>
        </div>
        <div className="modal fade" id={src} tabIndex="-1" role="dialog" aria-labelledby={src} aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button><br/>
                        <div className="container-fluid text-center">
                          <img src={src} className="full-img" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}