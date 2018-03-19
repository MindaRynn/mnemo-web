// Top level component for client side.

import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory, applyRouterMiddleware} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {useScroll} from 'react-router-scroll';

import routes from './routes';
import configureStore from './store/configureStore';

/*
 *  Export a function that takes the props and returns a ReactComponent.
 *  This is used for the client rendering hook after the page html is rendered.
 *  React will see that the state is the same and not do anything.
 *
 */
const App = (_props, _railsContext) => {
  const store = configureStore(_props, _railsContext);
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store
  );

  const scrollMiddleware = useScroll((prevRouterProps, { routes }) => {
    // Allow to set custom scroll position on a per route basis
    // Get scroll position on the last route
    let routeWithCustomScroll = routes.filter(route => route.hasOwnProperty('scrollTo'));
    if (routeWithCustomScroll.length) {
      return [0, routeWithCustomScroll[0].scrollTo];
    }
    // Scroll back to the top of the page
    return true;
  });


  return (
    <Provider store={ store }>
      <Router
        history={ history }
        children={ routes }
        render={applyRouterMiddleware(scrollMiddleware)}/>
    </Provider>
  );
};

export default App;