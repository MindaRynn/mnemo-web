import config from '../config/';
import BaseAdapter from './base';

class TagsAdapter extends BaseAdapter {
  static fetch() {
    return this.prototype.getRequest(config['api']['tags'], {});
  }
}

export default TagsAdapter;
