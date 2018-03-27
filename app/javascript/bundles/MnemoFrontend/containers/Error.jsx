
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

import BaseContainer from './Base';

class Error extends BaseContainer {
  static displayName = 'Error';

  render() {
    return (
      <div className="error-container">
        <main>
          <div className="content-container">
            {this.props.children}
            <Link to="/" className="btn btn-secondary">Home</Link>
          </div>
        </main>
      </div>
    );
  }
}

Error.propTypes = {
  /**
   * Holds the children components to render.
   * */
  children: PropTypes.element.isRequired
};

export default Error;
