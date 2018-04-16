import config from '../config/';
import BaseAdapter from './base';

class MemoryBoxesAdapter extends BaseAdapter {
  /**
   * Create a memory box for a user
   *
   * @param {String} [comment] - the actual comment
   * @param {Object} [travelogue] - the travelogue to which the comment belongs
   * @return {Promise} - a promise which will resolve to comment create response
   */
  static create(user_id, memoryBoxDetail) {
    let requestParams = {
      data: {
        attributes: {
          user_id: user_id,
          memory_box_detail: memoryBoxDetail
        },
      }
    };

    return this.prototype.postRequest(`${config['api']['memory_boxes']}`, requestParams);
  }
}

export default MemoryBoxesAdapter;
