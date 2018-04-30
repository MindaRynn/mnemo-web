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
            <h1 className="padding-bottom">
              MNEMO
            </h1>
            <p className="subtitle padding-bottom">
              Good memories should be kept and shared to people we love. Our application is a kind of social application which provides many features to connect people with their precious memory. Firstly, We focus on peer to peer features. Not only sending a capsule of memory to others, users can send the capsule to themselves.
            </p>
            <button className="btn btn-primary"><a href="/users/sign_in">Join us</a></button>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
