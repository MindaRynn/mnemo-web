import * as types from '../constants/app';

export function logout() {
  return {type: types.APP_LOGOUT};
}