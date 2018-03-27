import config from '../config/';
import BaseAdapter from './base';

class RoomsAdapter extends BaseAdapter {
  /**
   * Get rooms of a user identified by `userId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static fetch(userId) {
    let requestParams = {
      user_id: userId
    };

    return this.prototype.getRequest(config['api']['rooms'], requestParams);
  }

  /**
   * Get couple room of a user identified by `userId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static get(friendId) {
    return this.prototype.getRequest(config['api']['rooms'] + '/' + friendId);
  }

  /**
   * Create a room for a user
   *
   * @param {String} [comment] - the actual comment
   * @param {Object} [travelogue] - the travelogue to which the comment belongs
   * @return {Promise} - a promise which will resolve to comment create response
   */
  static create(user_ids, roomKey) {
    let requestParams = {
      data: {
        attributes: {
          user_ids: user_ids,
          room_key: roomKey
        },
      }
    };

    return this.prototype.postRequest(`${config['api']['rooms']}`, requestParams);
  }
}

export default RoomsAdapter;
