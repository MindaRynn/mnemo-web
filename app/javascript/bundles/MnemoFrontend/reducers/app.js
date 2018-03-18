import objectAssign from 'object-assign';
import * as actionTypes from '../constants/app';

export const initialState = {
  currentUser: null,
  notifications: [],
  errorStatus: null
};

export default function appReducer(state = initialState, action = {}) {
  let {type, user, errorStatus, notification, notificationId, inviteesEmails} = action;

  switch (type) {
    case actionTypes.APP_SHOW_ERROR:
      return objectAssign({}, state, {
        errorStatus: errorStatus
      });

    case actionTypes.APP_RESET_ERROR:
      return objectAssign({}, state, {
        errorStatus: null
      });

    case actionTypes.APP_SHOW_NOTIFICATION:
      return objectAssign({}, state, {
        notifications: state.notifications.concat(notification)
      });

    case actionTypes.APP_CLOSE_NOTIFICATION:
      return objectAssign({}, state, {
        notifications: state.notifications.filter(notification => {
          return notification.id !== notificationId;
        })
      });

    case actionTypes.APP_CURRENT_USER_UPDATE_SUCCESS:
      return objectAssign({}, state, {
        currentUser: user
      });

    case actionTypes.APP_CURRENT_USER_INVITATION_SUCCESS: {
      let updatedInvitees = state.currentUser.invitees_emails.concat(inviteesEmails);

      return objectAssign({}, state, {
        currentUser: {
          ...state.currentUser,
          invitees_emails: updatedInvitees
        }
      });
    }

    case actionTypes.APP_LOGOUT:
      return objectAssign({}, state, {
        currentUser: null
      });

    default:
      return state;
  }
}
