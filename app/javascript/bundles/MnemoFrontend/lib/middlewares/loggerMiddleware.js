/* eslint-disable no-console */
export default function logger({ getState }) {
  return next => action => {
    console.debug('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const result = next(action);

    console.debug('state after dispatch', getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return result;
  };
}
