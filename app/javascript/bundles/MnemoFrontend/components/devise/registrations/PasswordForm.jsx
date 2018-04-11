import React from "react";

export default class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { url, csrfToken, resetPasswordToken } = this.props;

    return (
      <div id="menu2" className="tab-pane fade">
        <div className="col-7">
          <form action={url} method="post" autoComplete="off">
            <div className="form-input-group">
              <div className="row space-item">
                <div className="col-md-4 align-self-center">
                  <label htmlFor="email">New password</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="password"
                    className="input input-width-max"
                    name="user[password]"/>
                </div>
              </div>
              <div className="row space-item">
                <div className="col-md-4 align-self-center">
                  <label htmlFor="email">Re-enter password</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="password"
                    className="input input-width-max"
                    name="user[password_confirmation]"/>
                </div>
              </div>
              <input type="hidden" name="_method" value="put" />
              <input type="hidden" name="authenticity_token" value={csrfToken} />
              <input
                type="hidden"
                name="user[reset_password_token]"
                value={resetPasswordToken}/>
              <div className="row space-item">
                <div className="col-md-4" />
                <div className="col-md-8">
                  <button
                    className="btn btn-primary btn-max-width"
                    type="submit">
                    Save change
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    );
  }
}
