/* eslint class-methods-use-this: off */

/**
 * Created by Luke on 01/05/15.
 */
import request from 'request';

import {
  RequestError, StatusCodeError, responseContainsError, clientError,
} from './utils/ErrorHandlers';

/**
 * AppNexus Transport class.
 * @class Transport
 * @classdesc The transport is responsible for handling all
 *            request to the AppNexus api service
 */
class Transport {
  /**
   * Transport constructor.
   * @constructs Transport
   * @params {object} [options={}] - transport options
   */
  constructor(options = { apiBase: '/' }) {
    /**
     * Transport options
     * @member Client#options
     */
    this.options = options;
  }

  /**
   * Preform a GET request
   *
   * @method get
   * @see {@link uri} for possible endpoints.
   * @params {string} endpoint - api endpoint
   * @params {object} [args={}] - arguments
   * @returns {Promise<Object, Error>} Response body
   * */
  get(endpoint, args = {}) {
    return this.request('GET', endpoint, args);
  }

  /**
   * Preform a PUT update request
   *
   * @method put
   * @see {@link uri} for possible endpoints.
   * @params {string} endpoint - api endpoint
   * @params {object} [args={}] - arguments
   * @returns {Promise<Object, Error>} Response body
   * */
  put(endpoint, ...args) {
    return this.request('PUT', endpoint, ...args);
  }

  /**
   * Preform a POST request
   *
   * @method post
   * @see {@link uri} for possible endpoints.
   * @params {string} endpoint - api endpoint
   * @params {object} [args={}] - arguments
   * @returns {Promise<Object, Error>} Response body
   * */
  post(endpoint, ...args) {
    return this.request('POST', endpoint, ...args);
  }

  /**
   * Preform a DELETE request
   *
   * @method delete
   * @see {@link uri} for possible endpoints.
   * @params {string} endpoint - api endpoint
   * @params {object} [args={}] - arguments
   * @returns {Promise<Object, Error>} Response body
   * */
  delete(endpoint, ...args) {
    return this.request('DELETE', endpoint, ...args);
  }

  requestPromise(options) {
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (err) {
          reject(new RequestError(err));
        } else if (clientError(response)) {
          const msg = (body.response && body.response.error)
            ? body.response.error : response.statusMessage;

          reject(new StatusCodeError(response.statusCode, msg));
        } else if (responseContainsError(body)) {
          const msg = (body.response && body.response.error)
            ? body.response.error : response.statusMessage;

          reject(new RequestError(Error(msg)));
        } else if (response.statusCode >= 500) {
          reject(new StatusCodeError(response.statusCode,
            response.statusMessage));
        } else {
          resolve([body, response]);
        }
      });
    });
  }

  /**
   * Preform a the actual request
   *
   * @method request
   * @private
   * @see {@link uri} for possible endpoints.
   * @params {string} method - Request method
   * @params {string} endpoint - api endpoint
   * @params {object} [args={}] - arguments
   * @returns {Promise<Object, Error>} Response body
   * */
  async request(method, endpoint, ...args) {
    const payload = {
      method,
      uri: this.options.apiBase + endpoint,
    };

    const [data = {}, headers = {}, dataType = 'formData'] = args;

    if (this.options.proxy) {
      payload.proxy = this.options.proxy;
    }

    if (method === 'GET') {
      payload.json = true;
      payload.qs = data;
    } else if ('Content-Type' in headers
        && typeof headers['Content-Type'] === 'string'
        && headers['Content-Type'] !== 'application/json') {
      payload[dataType] = data;
    } else {
      payload.json = data;
    }

    if (Object.keys(headers).length) {
      payload.headers = headers;
    }

    if (this.options.token && this.options.token.value) {
      payload.headers = Object.assign(headers, {
        Authorization: this.options.token.value,
      });
    }

    const [body] = await this.requestPromise(payload);

    return body.response;
  }
}

export default Transport;
