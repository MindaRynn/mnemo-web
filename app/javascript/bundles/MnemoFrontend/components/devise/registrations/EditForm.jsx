import React from 'react';
import Image from '../../image'
import ProfileForm from './ProfileForm'
import PasswordForm from './PasswordForm'

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      avatar: this.props.avatarUrl,
      username: this.props.username,
      email: this.props.email,
      bio: this.props.bio
    }
  }

  render() {
    let {url, csrfToken, signinPath, resetPasswordToken} = this.props;
    let {avatar} = this.state;

    return (
      <div>
        <div className="setting-container">
          <h1 className="setting-header">Setting</h1>
          <div className="row">
            <div className="col-md-2">
              <div className="row">
                <ul className="nav">
                  <li className="space-item"><a data-toggle="tab" href="#menu1" className="active show">Profile</a></li>
                  <li className="space-item"><a data-toggle="tab" href="#menu2">Password</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-10">
              <ProfileForm csrfToken={csrfToken} email={this.state.email}  avatar={this.state.avatar} url={url} username={this.state.username} bio={this.state.bio}/>
              <PasswordForm url={url} csrfToken={csrfToken} resetPasswordToken={resetPasswordToken}/>
            </div>
          </div>
        </div>
      </div>


    );
  }
}