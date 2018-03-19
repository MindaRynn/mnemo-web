import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import DirectMessage from './containers/DirectMessage';

// import Error from './containers/Error';
// import ErrorNotFound from './screens/error/notFound';

export default (
  <Route path="/" component={App}>
    <Route path="/directMessage" component={DirectMessage} />

    {/*<Route path="*" getComponent={(_location, callback) => {*/}
      {/*callback(null, _props => <Error><ErrorNotFound /></Error>);*/}
    {/*}} />*/}
  </Route>
);
