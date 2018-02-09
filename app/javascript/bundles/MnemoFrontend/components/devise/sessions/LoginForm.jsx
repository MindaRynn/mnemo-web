import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, csrfToken} = this.props;

    return (
      <form action={url}
            method="post"
            autoComplete="off">

        <div>
          <label htmlFor="email">Email</label>
          <input type="email"
                          id="user_email"
                          name="user[email]"/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password"
                          id="user_password"
                          name="user[password]"/>
        </div>
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <button type="submit">
          Login
        </button>
      </form>
    );
  }
}
