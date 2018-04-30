import React from 'react';
import * as firebase from 'firebase';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, csrfToken, signinPath} = this.props;

    return (
      <form action={url}
            method="post"
            autoComplete="off">

        <div className="form-input-group">
          <label htmlFor="name">Name</label>
          <input name="user[name]"/>
        </div>

        <div className="form-input-group">
          <label htmlFor="email">Email</label>
          <input type="email"
                 name="user[email]"/>
        </div>

        <div className="form-input-group">
          <label htmlFor="password">Password</label>
          <input type="password"
                 name="user[password]"/>
        </div>
        <div className="form-input-group">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password"
                 name="user[password_confirmation]"/>
        </div>
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <input type="hidden" name="user[notification_key]" value={firebase.database().ref().child('notification').push().key} />

        <div className="form-input-group flex-end">
          <div className="form-group">
            <a>Accept term & policy</a>
            <button className="btn btn-primary" type="submit">
              Sign up
            </button>
          </div>
        </div>

        <div className="form-input-group flex-end">
          <div className="form-group centered">
            Already have an account? <a href={signinPath}> Sign in</a>
          </div>
        </div>
      </form>

  );
  }
}
