import * as types from '../constants/app';
import config from '../config/';

export function showError(errorStatus) {
  return {type: types.APP_SHOW_ERROR, errorStatus: errorStatus};
}

export function resetErrors() {
  return {type: types.APP_RESET_ERROR};
}

export function appErrorHandler(error) {
  return function (dispatch) {
    switch (error.status) {
      case 401:
        dispatch(logout());
        break;

      case 403:
        // When fetching an unauthorized resource, show a 404 page
        // When performing other operations POST / PATCH / DESTROY, show a notification message
        if (error.config.method === 'GET') {
          dispatch(showError(403));
        } else {
          let notifications = parseNotificationFromError(error);
          dispatch(showNotification(notifications, config['notificationStatus']['error']));
        }
        break;

      case 404:
      case 500:
        dispatch(showError(error.status));
        break;

      // Handle other errors by showing a notification
      default: {
        // TODO: Find a a better way to not capture React errors
        if (!error.headers) {
          return;
        }
        let notifications = parseNotificationFromError(error);
        dispatch(showNotification(notifications, config['notificationStatus']['error']));
      }
    }
  };
}

function parseNotificationFromError(error) {
  if (!error.data || !error.data.errors) {
    return [];
  }

  return error.data.errors.map(error => {
    return error.detail;
  });
}

export function logout() {
  return {type: types.APP_LOGOUT};
}