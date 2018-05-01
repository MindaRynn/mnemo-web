import config from '../config/';
import BaseAdapter from './base';

class UsersAdapter extends BaseAdapter {
  /**
   * Get  user identified by `userId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static get(userId) {
    let requestParams = {
      user_id: userId
    };

    return this.prototype.getRequest(config['api']['users'], requestParams);
  }

  /**
   * Fetch all users
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static fetch() {
    let requestParams = {};

    return this.prototype.getRequest(config['api']['users'], requestParams);
  }
}

export default UsersAdapter;
