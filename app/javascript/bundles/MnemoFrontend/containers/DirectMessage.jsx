import React from 'react';

import BaseContainer from './Base';
import DirectMessageScreen from '../screens/directMessage/';

class DirectMessage extends BaseContainer {
  static displayName = 'Profile';

  render() {

    return (
      <DirectMessageScreen />
    );
  }
}

export default DirectMessage;