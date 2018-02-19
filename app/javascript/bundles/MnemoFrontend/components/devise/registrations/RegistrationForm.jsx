import React from 'react';

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
          <input id="user_name"
                 name="user[name]"/>
        </div>

        <div className="form-input-group">
          <label htmlFor="email">Email</label>
          <input type="email"
                 id="user_email"
                 name="user[email]"/>
        </div>

        <div className="form-input-group">
          <label htmlFor="password">Password</label>
          <input type="password"
                 id="user_password"
                 name="user[password]"/>
        </div>
        <div className="form-input-group">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password"
                 id="user_password_confirmation"
                 name="user[password_confirmation]"/>
        </div>
        <input type="hidden" name="authenticity_token" value={csrfToken} />

        <div className="form-input-group flex-end">
          <div className="form-group">
            <a>Accept term & policy</a>
            <button class="btn btn-primary" type="submit">
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
