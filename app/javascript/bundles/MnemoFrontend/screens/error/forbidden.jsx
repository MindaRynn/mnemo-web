import React from 'react';

import ErrorBaseComponent from './base';

class ErrorForbidden extends ErrorBaseComponent {
  static displayName = ErrorForbidden;

  render() {
    return (
      <div className="error is-403">
        <h1>403</h1>
        <h6>{I18n.t('frontend.error.forbidden')}</h6>
      </div>
    );
  }
}

export default ErrorForbidden;