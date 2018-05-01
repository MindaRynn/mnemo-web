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
          <label>E-mail</label>
          <input type="email"
                 name="user[email]"/>
        </div>

        <div className="form-input-group">
          <label htmlFor="password">Password</label>
          <input type="password"
                 name="user[password]"/>
        </div>
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <div className="form-input-group flex-end">
          <div className="form-group">
            <a href={forgetPasswordPath}>Forget your password?</a>
            <button class="btn btn-primary" type="submit">
              Sign in
            </button>
          </div>
        </div>

        <div className="form-input-group flex-end">
          <div className="form-group centered">
            Don't you have an account? <a href={signupPath}>&nbsp;<u>Sign up</u></a>
          </div>
        </div>
      </form>
    );
  }
}
