import React from 'react';
import Image from '../../image'

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangeBio = this.handleChangeBio.bind(this)
    
    this.state = {
      avatar: this.props.avatarUrl,
      activeTab: "profile",
      username: this.props.username,
      email: this.props.email,
      bio: this.props.bio
    }
  }

  handleTab(e) {
    e.preventDefault();
    const tab = e.target.name
    this.setState(() => {
      return {
        activeTab: tab
      };
    });
  }

  handleChangeEmail(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }

  handleChangeUsername(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }

  handleChangeBio(e) {
    e.preventDefault();
    this.setState({
      bio: e.target.value
    });
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
    let {url, csrfToken, signinPath, resetPasswordToken} = this.props;
    let {avatar} = this.state;
    const dummyAvatar = "https://storage.googleapis.com/mnemo-storage/placeHolderAvatar/tempAvatar.jpg";

    // debugger
    return (
      <div>
        <div className="setting-container">
          <h1 className="setting-header">Setting</h1>
          <div className="row">
            <div className="col-md-2">
              <div className="row">
                <button style={this.state.activeTab == "profile" ? {color: '#454550'} : {color: '#d7d7d7'}} name="profile" onClick={this.handleTab} className="btn btn-tab">Profile</button>
              </div>
              <div className="row">
                <button style={this.state.activeTab == "password" ? {color: '#454550'} : {color: '#d7d7d7'}} name="password" onClick={this.handleTab} className="btn btn-tab">Password</button>
              </div>
            </div>
            {this.state.activeTab == "profile" && 
              <div className="col-md-10">
                <div className="row space-item">

                  <div className="col-md-7">
                    <form ref={(ref) => this.avtarForm = ref} action={url} method="post" autoComplete="off">
                      <div className="form-input-group">
                        <div className="row">
                          <div className="col-md-4 align-self-center">
                            <label htmlFor="username">Username</label>
                          </div>
                          <div className="col-md-8">
                            <input className="input input-width-max" onChange={this.handleChangeUsername} name="user[name]" value={this.state.username}/>
                          </div>
                        </div>
                        <div className="row space-item">
                          <div className="col-md-4 align-self-center">
                            <label htmlFor="email">Email</label>
                          </div>
                          <div className="col-md-8">
                            <input className="input input-width-max" onChange={this.handleChangeEmail} name="user[email]" value={this.state.email}/>
                          </div>
                        </div>
                        <div className="row space-item">
                          <div className="col-md-4 align-self-center">
                            <label htmlFor="bio">Bio</label>
                          </div>
                          <div className="col-md-8">
                            <textarea className="textarea textarea-width-max" rows="4" onChange={this.handleChangeBio} name="user[bio]" value={this.state.bio}></textarea>
                          </div>
                        </div>
                        <div className="row space-item">
                          <div className="col-md-4"></div>
                          <div className="col-md-8">
                            <button onClick={e => {this.handleClick}} className="btn btn-primary btn-max-width" type="submit">Save change</button>
                          </div>
                        </div>
                      </div>

                      <input type="hidden" name="authenticity_token" value={csrfToken} />
                      <input type="hidden" name="_method" value="put"/>
                      <input type="hidden" name="user[image]" value={this.state.avatar} />

                    </form>
                  </div>

                  <div className="col-md-2"><div className="line-split"></div></div>

                  <div className="col-md-3">
                    {avatar ? <Image type="standard" src={this.state.avatar} /> : <Image type="standard" src={dummyAvatar} />}
                    <form id="avatarForm" onSubmit={this.submitHandler} encType="multipart/form-data">
                      <label htmlFor="avatar" style={{marginBottom: "0px"}} className="btn btn-select-image space-item">Select image</label>
                      <input onChange={this.inputOnChangeHandler} style={{display: 'none'}} id="avatar" type="file" name="file" />
                      <input id="submitButton" style={{display: 'none'}} type="submit" value="Upload" />
                    </form>
                  </div>
                </div>
              </div>
            }

            {this.state.activeTab == "password" && 
              <div className="col-md-6">
                <form action={url}
                      method="post"
                      autoComplete="off">
                  <div className="form-input-group">
                    {/* <div className="row space-item">
                      <div className="col-md-4 align-self-center">
                        <label htmlFor="username">Current password</label>
                      </div>
                      <div className="col-md-8">
                        <input type="password" className="input input-width-max" name="user[password]"/>
                      </div>
                    </div> */}
                    <div className="row space-item">
                      <div className="col-md-4 align-self-center">
                        <label htmlFor="email">New password</label>
                      </div>
                      <div className="col-md-8">
                        <input type="password" className="input input-width-max" name="user[password]"/>
                      </div>
                    </div>
                    <div className="row space-item">
                      <div className="col-md-4 align-self-center">
                        <label htmlFor="email">Re-enter password</label>
                      </div>
                      <div className="col-md-8">
                        <input type="password" className="input input-width-max" name="user[password_confirmation]"/>
                      </div>
                    </div>
                    <input type="hidden" name="_method" value="put" />
                    <input type="hidden" name="authenticity_token" value={csrfToken} />
                    <input type="hidden" name="user[reset_password_token]" value={resetPasswordToken} />
                    <div className="row space-item">
                      <div className="col-md-4"></div>
                      <div className="col-md-8">
                        <button onClick={e => {this.handleClick}} className="btn btn-primary btn-max-width" type="submit">Save change</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>


    );
  }
}