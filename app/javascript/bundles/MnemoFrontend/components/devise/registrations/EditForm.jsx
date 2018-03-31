import React from 'react';
import Image from '../../image'

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    
    this.state = {
      avatar: this.props.avatarUrl
    }
  }

  handleClick(e) {
    e.preventDefault()
    // Explicitly focus the text input using the raw DOM API.
    if (this.avtarForm !== null) {
      // debugger
    }
  }

  inputOnChangeHandler (e) {
    document.getElementById('submitButton').click();
  }

  submitHandler(e) {
    e.preventDefault();
    
    let data = new FormData(e.target)
    let _this = this;
    // console.log(_this)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload"); 
    xhr.onload = function(event){ 
      // debugger

      _this.setState({
          avatar: event.target.response
      })
    }; 
    
    xhr.send(data);
  }


  render() {
    let {url, csrfToken, signinPath} = this.props;
    let {avatar} = this.state

    // debugger
    return (
      <div>
        {avatar ? <Image type="standard" src={this.state.avatar} /> : <Image type="standard" src="https://storage.googleapis.com/mnemo-storage/placeHolderAvatar/tempAvatar.jpg" />}
        <form id="avatarForm" onSubmit={this.submitHandler} encType="multipart/form-data">
          <h3>Change profile picture</h3>
          <div className="form-input-group">
            <label htmlFor="name">Name</label>
            <input name="user[name]"/>
          </div>
          <input onChange={this.inputOnChangeHandler} id="avatar" type="file" name="file" />
          <input id="submitButton" style={{display: 'none'}} type="submit" value="Upload" />
        </form>

        <form ref={(ref) => this.avtarForm = ref} action={url} method="post" autoComplete="off">
          <div className="form-input-group">
            <label htmlFor="name">Name</label>
            <input name="user[name]"/>
          </div>

          <input type="hidden" name="authenticity_token" value={csrfToken} />
          <input type="hidden" name="_method" value="put"/>
          <input type="hidden" name="user[image]" value={this.state.avatar} />

          <div className="form-input-group flex-end">
            <div className="form-group centered">
              <button onClick={e => {this.handleClick}} className="btn btn-primary" type="submit">Confirm</button>
            </div>
          </div>

        </form>
      </div>


    );
  }
}