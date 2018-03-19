import React from 'react';

import ErrorBaseComponent from './base';

class ErrorNotFound extends ErrorBaseComponent {
  static displayName = ErrorNotFound;

  render() {
    return (
      <div className="error is-404">
        <h1>404</h1>
        <h6>{I18n.t('frontend.error.not_found')}</h6>
      </div>
    );
  }
}

export default ErrorNotFound;