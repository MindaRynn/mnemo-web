import objectAssign from 'object-assign';
import config from '../config/';
import requestManager from '../lib/requestManager';

class BaseAdapter {
  /**
   * Make a GET request
   *
   * @param {string} [endpoint] - the API endpoint to use
   * @param {object} [params] - params to be sent
   * @param {boolean} [requireAuthentication] - whether the request requires to access token authentication
   * @return {Promise} a Promise that will resolve into an object or reject with
   *                   an error object for its reason
   */
  getRequest(endpoint, params, requireAuthentication = true) {
    let requestParams = {params: objectAssign({}, this._baseParams(requireAuthentication), params)};
    return requestManager('GET', endpoint, requestParams);
  }

  /**
   * Make a POST request
   *
   * @param {string} [endpoint] - the API endpoint to use
   * @param {object} [data] - data to be sent
   * @param {boolean} [requireAuthentication] - whether the request requires to access token authentication
   * @return {Promise} a Promise that will resolve into an object or reject with
   *                   an error object for its reason
   */
  postRequest(endpoint, data, requireAuthentication = true) {
    let requestParams = {data: objectAssign({}, this._baseParams(requireAuthentication), data)};

    return requestManager('POST', endpoint, requestParams);
  }

  /**
   * Make a PATCH request
   *
   * @param {string} [endpoint] - the API endpoint to use
   * @param {object} [data] - data to be sent
   * @param {boolean} [requireAuthentication] - whether the request requires to access token authentication
   * @return {Promise} a Promise that will resolve into an object or reject with
   *                   an error object for its reason
   */
  patchRequest(endpoint, data, requireAuthentication = true) {
    let requestParams = {data: objectAssign({}, this._baseParams(requireAuthentication), data)};

    return requestManager('PATCH', endpoint, requestParams);
  }

  /**
   * Make a DELETE request
   *
   * @param {string} [endpoint] - the API endpoint to use
   * @param {boolean} [requireAuthentication] - whether the request requires to access token authentication
   * @return {Promise} a Promise that will resolve into an object or reject with
   *                   an error object for its reason
   */
  deleteRequest(endpoint, requireAuthentication = true) {
    let requestParams = {data: objectAssign({}, this._baseParams(requireAuthentication))};

    return requestManager('DELETE', endpoint, requestParams);
  }

  /**
   * Get stored access_token to make authenticated API requests
   *
   * @return {String, undefined} -
   *  - access token, if available
   *  - undefined, if it is not available
   */
  _getAccessToken() {
    let token = JSON.parse(localStorage.getItem(config['auth']['localStorageKey']));

    return (token || {}).access_token;
  }

  /**
   * Get base request attributes to send on every request
   *
   * @param {object} [requireToken] - whether to add the access token to the base attributes
   * @return {Object} - params
   */
  _baseParams(requireToken = true) {
    let baseParams = {};
    let accessToken = this._getAccessToken();
    
    if (requireToken && accessToken) {
      baseParams = objectAssign({}, baseParams, {access_token: accessToken});
    }

    return baseParams;
  }

  /**
   * Convert object params as url params for get requests
   * Example: Convert {filter: {user_id: 8}, sort: {}  } to {filter[user_id]: 8}
   *
   * @param {object} [params] - whether to add the access token to the base attributes
   * @return {Object} - params
   */
  _parameterizeParams(params) {
    let requestParams = {};

    Object.keys(params).map((paramKey) => {
      if (typeof params[paramKey] === 'object') {
        Object.keys(params[paramKey]).map((key) => {
          requestParams[`${paramKey}[${key}]`] = params[paramKey][key];
        });
      } else {
        requestParams[paramKey] = params[paramKey];
      }
    });

    return requestParams;
  }
}

export default BaseAdapter;
