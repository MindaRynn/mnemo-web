import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import DirectMessage from './containers/DirectMessage';
import Feed from './containers/Feed';

import Error from './containers/Error';
import ErrorNotFound from './screens/error/notFound';

export default (
  <Route path="/" component={App}>

    <IndexRoute component={Feed} />

    <Route path="/directMessage" component={DirectMessage} />

    <Route path="*" getComponent={(_location, callback) => {
      callback(null, _props => <Error><ErrorNotFound /></Error>);
    }} />
  </Route>
);
