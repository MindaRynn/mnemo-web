import React from 'react';

import ErrorBaseComponent from './base';

class ErrorApplicationError extends ErrorBaseComponent {
  static displayName = ErrorApplicationError;

  render() {
    return (
      <div className="error is-500">
        <h1>500</h1>
        <h6>{I18n.t('frontend.error.application')}</h6>
      </div>
    );
  }
}


export default ErrorApplicationError;