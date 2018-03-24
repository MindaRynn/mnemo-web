import PropTypes from 'prop-types';
import React from 'react';
import PrimaryButton from './buttons/primaryButton';

export default class LandingPage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name };
  }

  render() {
    return (
      <div>
        <div className="row content">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h1>
              MNEMO
            </h1>
            <h2>
             Welcome to our final project ....
            </h2>
            <PrimaryButton text="Join us" />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
