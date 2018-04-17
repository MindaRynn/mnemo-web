import config from '../config/';
import BaseAdapter from './base';

class TimeCapsulesAdapter extends BaseAdapter {
  /**
   * Get capsules of a user identified by `userId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static fetch(userId) {
    let requestParams = {
      user_id: userId
    };

    return this.prototype.getRequest(config['api']['time_capsules'], requestParams);
  }

  /**
   * Get capsule identified by `timeCapsuleId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static get(timeCapsuleId) {
    let requestParams = {
      time_capsule_id: timeCapsuleId
    };

    return this.prototype.getRequest(config['api']['time_capsules'], requestParams);
  }

  /**
   * Create a time capsule for a user
   *
   * @param {String} [comment] - the actual comment
   * @param {Object} [travelogue] - the travelogue to which the comment belongs
   * @return {Promise} - a promise which will resolve to comment create response
   */
  static create(user_ids, timeCapsuleDetail) {
    let requestParams = {
      data: {
        attributes: {
          user_id: user_ids,
          time_capsule_detail: timeCapsuleDetail
        },
      }
    };

    return this.prototype.postRequest(`${config['api']['time_capsules']}`, requestParams);
  }
}

export default TimeCapsulesAdapter;
