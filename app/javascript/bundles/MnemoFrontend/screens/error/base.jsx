import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

class ErrorBase extends React.Component {
  static displayName = ErrorBase;

  constructor(props, context) {
    super(props, context);

    this.onRouteLocationChange();
  }

  componentWillUnmount() {
    this.tearDown();
  }

  tearDown() {
    let {onUnmount} = this.props;
    if (onUnmount) {
      onUnmount.call(this);
    }

    this.browserHistoryUnlistener();
  }

  onRouteLocationChange() {
    // The return value from listen is a function that will unsubscribe the listener when called
    this.browserHistoryUnlistener = browserHistory.listen(() => {
      this.tearDown();
    });
  }
}

ErrorBase.propTypes = {
  /**
   * Holds the method to call when component is unmounted
   * */
  onUnmount: PropTypes.func
};

export default ErrorBase;