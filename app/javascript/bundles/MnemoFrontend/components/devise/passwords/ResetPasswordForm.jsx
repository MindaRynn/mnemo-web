import React from 'react';

export default class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, csrfToken, resetPasswordToken} = this.props;

    return (
      <form action={url}
            method="post"
            autoComplete="off">

        <div className="form-input-group">
          <label>New password</label>
          <input type="password"
                 name="user[password]"/>
        </div>

        <div className="form-input-group">
          <label>Confirm new password</label>
          <input type="password"
                 name="user[password_confirmation]"/>
        </div>

        <input type="hidden" name="_method" value="put" />
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <input type="hidden" name="user[reset_password_token]" value={resetPasswordToken} />

        <div className="form-input-group flex-end">
          <div className="form-group">
            <button class="btn btn-primary btn-max-width" type="submit">
              Save new password
            </button>
          </div>
        </div>
      </form>
    );
  }
}
