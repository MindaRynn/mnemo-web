import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import DirectMessage from './containers/DirectMessage';
import Feed from './containers/Feed';
import Profile from './containers/Profile';
import TimeCapsule from './containers/TimeCapsule';

import Error from './containers/Error';
import ErrorNotFound from './screens/error/notFound';

export default (
  <Route path="/" component={App}>

    <IndexRoute component={Feed} />

    <Route path="/directMessage" component={DirectMessage} />
    <Route path="/profile" component={Profile} />

    <Route path="/profile/:id" component={Profile} />

    <Route path="timeCapsule/:id" component={TimeCapsule} />

    <Route path="*" getComponent={(_location, callback) => {
      callback(null, _props => <Error><ErrorNotFound /></Error>);
    }} />
  </Route>
);
