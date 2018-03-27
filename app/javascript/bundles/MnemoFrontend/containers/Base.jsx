import React from 'react';

class BaseContainer extends React.Component {
  static defaultDisplayName = 'app';

  componentWillMount() {
    this._setBodyClass();
  }

  componentWillUnmount() {
    this._resetBodyClass();
  }

  // Add CSS class names to body for styling purposes
  _setBodyClass() {
    // Use container component name as first class
    let displayName = this.constructor.displayName ? this.constructor.displayName : this.constructor.defaultDisplayName;
    // Use route path items as secondary classes
    // Filter out:
    // - empty path strings
    // - too short path strings (< 1 letter)
    // - params element in path strings e.g /:id
    let routeName = this.props.route && this.props.route.path ? this.props.route.path.split('/')
        .filter((e) => {return e && e.length > 1 && !e.match(/:/)})
        .join(' ') : '';
    // Convert to standard css class names
    // - From camelcase to dashed strings
    // - All lowercase
    let bodyClassNames = [displayName, routeName]
        .map((className) => {
          return className.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        }).join(' ');

    document.querySelector('body').className = bodyClassNames;
  }

  _resetBodyClass() {
    document.querySelector('body').className = '';
  }
}

export default BaseContainer;
