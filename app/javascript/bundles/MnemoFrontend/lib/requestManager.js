import request from 'axios';
import objectAssign from 'object-assign';
import config from '../config/'

import {deserialize} from '../helpers/jsonApiHelper';

const defaultOptions = {
  responseType: 'json',
  timeout: config['axios']['timeout']
};

/**
 * The main API access function that comes preconfigured with useful defaults.
 *
 * @param {string} [method] - the HTTP method to use
 * @param {string} [endpoint] - the API endpoint to use
 * @param {object} [requestOptions] - params and date to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */
export default function(method, endpoint, requestOptions = {}) {
  const requestConfig = {
    method: method,
    url: endpoint
  };
  return request(objectAssign({}, defaultOptions, requestConfig, requestOptions))
    .then(response => {
      try {
        return deserialize(response.data);
      } catch (e) {
        // Unknown response format
        return Promise.reject({
          data: {
            errors: [{
              status: 0,
              detail: 'Something went wrong, please contact us'
            }]
          }
        });
      }
    })
    .catch(response => {
      let error = {...response}.response;
      console.error(`[API][${method}][${endpoint}]`, error.status, error.data);

      throw error;
    });
}