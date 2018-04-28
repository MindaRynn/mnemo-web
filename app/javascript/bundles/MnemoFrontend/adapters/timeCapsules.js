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
  static fetch(requestParams = {}) {

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

  /**
   * Update a time capsule
   *
   * @param {String} [timeCapsuleId] - time Capsule ID
   * @param {Object} [timeCapsuleDetail] - time Capsule Detail
   * @return {Promise} - a promise which will resolve to comment create response
   */
  static update(timeCapsuleId, timeCapsuleDetail) {
    let requestParams = {
      data: {
        attributes: {
          time_capsule_detail: timeCapsuleDetail
        },
      }
    };

    return this.prototype.patchRequest(`${config['api']['time_capsules']}/${timeCapsuleId}`, requestParams);
  }

  /**
   * Update a time capsule that opened
   *
   * @param {String} [timeCapsuleId] - time Capsule ID
   * @return {Promise} - a promise which will resolve to timeCapsule opened response
   */
  static open(timeCapsuleId) {
    let requestParams = {};

    return this.prototype.postRequest(`${config['api']['time_capsules']}/${timeCapsuleId}/open`, requestParams);
  }

  /**
   * Delete capsule identified by `timeCapsuleId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static delete(timeCapsuleId) {
    let requestParams = {
      time_capsule_id: timeCapsuleId
    };

    return this.prototype.deleteRequest(`${config['api']['time_capsules']}/${timeCapsuleId}`, requestParams);
  }
}

export default TimeCapsulesAdapter;
