import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {
    let {currentUser} = this.props.app;
    return {
      currentUser
    };
  }

  componentDidMount() {
    let locationProps = this.props.router.location;
    // Perform redirect if param redirect_to is present
    if (locationProps) {
      browserHistory.push(locationProps);
    }
  }

  render() {
    return (
      <div className="app-container">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  /**
   * Holds the children components to render.
   * */
  children: PropTypes.element.isRequired,
  /**
   * Holds the app store
   * */
  app: PropTypes.object.isRequired
};

App.childContextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object
};

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

