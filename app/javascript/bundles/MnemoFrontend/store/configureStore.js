// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import objectAssign from 'object-assign';
import pick from 'lodash/pick';

import rootReducer from '../reducers/';
import {initialState as initialAppState} from '../reducers/app';
import loggerMiddleware from '../lib/middlewares/loggerMiddleware';

export default function configureStore(initialState) {
  const middlewares = [
    // Custom middleware
    // Log reducer actions and state changes to console for debugging
    loggerMiddleware,

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware
  ];

  const composedStore = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
  );

  // Merge initial auth state set on Rails view (initialState) with client app + auth initial state (initialAppState)
  let composedAppState = objectAssign({}, initialAppState, pick(initialState, ['currentUser']));

  let composedInitialState = {
    app: composedAppState
  };
  const store = createStore(rootReducer, composedInitialState, composedStore);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
