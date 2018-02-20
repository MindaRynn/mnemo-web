import React from 'react';

export default class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, csrfToken} = this.props;

    return (
      <form action={url}
            method="post"
            autoComplete="off">

        <div className="form-input-group">
          <label>Email Address</label>
          <input type="email"
                 name="user[email]"/>
        </div>

        <input type="hidden" name="authenticity_token" value={csrfToken} />

        <div className="form-input-group flex-end">
          <div className="form-group">
            <button class="btn btn-primary btn-max-width" type="submit">
              Sent reset link
            </button>
          </div>
        </div>
      </form>
    );
  }
}
