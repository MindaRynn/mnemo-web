import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, csrfToken, signupPath, forgetPasswordPath} = this.props;

    return (
      <form action={url}
            method="post"
            autoComplete="off">

        <div className="form-input-group">
          <label>Username / Email</label>
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
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <div className="form-input-group flex-end">
          <div className="form-group">
            <a href={forgetPasswordPath}> Forget your password?</a>
            <button class="btn btn-primary" type="submit">
              Sign in
            </button>
          </div>
        </div>

        <div className="form-input-group flex-end">
          <div className="form-group centered">
            Don'nt you have an account? <a href={forgetPasswordPath}> Sign up</a>
          </div>
        </div>
      </form>
    );
  }
}
