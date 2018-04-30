import React from "react";
import * as firebase from 'firebase';
import config from '../config/';

class FirebaseInitialize extends React.Component {

  constructor(props) {
    super(props);

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config['firebase']);
    }
  }

  render() {
    return null
  }
}

export default FirebaseInitialize;