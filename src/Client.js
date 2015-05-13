/**
 * Created by Luke on 01/05/15.
 */
import endpoints from './Endpoints';
import Transport from './Transport';
import {RateLimiter} from 'limiter';

/** @constant {number} */
const MAX_AUTH_PERIOD = 300000;

/** @constant {number} */
const MAX_READ_PERIOD = 60000;

/** @constant {number} */
const MAX_WRITE_PERIOD = 60000;

/** @constant {number} */
const MAX_READ_PER_PERIOD = 100;

/** @constant {number} */
const MAX_WRITE_PER_PERIOD = 60;

/** @constant {number} */
const MAX_AUTH_PER_PERIOD = 10;

/** @constant {number} */
const TOKEN_LIFETIME = 60 * 60 * 1000;

/** @private */
var credentials = {};

/**
 * AppNexus Client API class.
 *
 * @class Client
 * @extends Transport
 */
class Client extends Transport {

  /**
   * Client constructor.
   *
   * @constructs Client
   * @params {string} [apiBase=http://api.appnexus.com] - default api domain
   */
  constructor(apiBase = 'http://api.appnexus.com', limits = {}) {
    super();
    this.options = {apiBase, limits};

    /* Set limiters */
    this.writeLimiter = new RateLimiter(limits.write || MAX_WRITE_PER_PERIOD, MAX_WRITE_PERIOD);
    this.readLimiter = new RateLimiter(limits.read || MAX_READ_PER_PERIOD, MAX_READ_PERIOD);
    this.authLimiter = new RateLimiter(limits.auth || MAX_AUTH_PER_PERIOD, MAX_AUTH_PERIOD);
  }

  /**
   * Authorize client function
   *
   * @method authorize
   * @params {string} username - Username
   * @params {string} password - Password
   * @returns {Promise<String, Error>} AppNexus Access Token
   */
  authorize(username, password) {

    if (!username || !password) {
      throw Error('Authorization credentials are missing!');
    }

    credentials = {username, password};

    var data = {
      auth: credentials
    };

    if (this.options.token) {
      delete this.options.token;
    }

    return this.post(endpoints.AUTHENTICATION_SERVICE, data)
        .then((response) => {
          this.options.token = {value: response.token, _ts: +new Date()};
          return response.token;
        });
  }

  /**
   * Refresh token
   **
   * @method refreshToken
   * @returns {Promise<String, Error>} AppNexus Access Token
   */
  refreshToken() {
    if (!credentials.username || !credentials.password) {
      throw Error('Authorization credentials are missing!');
    }

    return this.authorize(credentials.username, credentials.password);
  }

  /**
   * Checks if request token is not expired
   **
   * @isExpired rateLimiter
   * @returns {boolean} token expired
   */
  isExpired(ts = 0) {
    var timestamp = this.options.token && this.options.token._ts ? this.options.token._ts : ts;
    return timestamp + TOKEN_LIFETIME <= +new Date();
  }

  /**
   * Rate limit a request according to specs
   **
   * @method rateLimiter
   * @see {@link uri} for possible endpoints.
   * @params {string} method - Request method
   * @params {string} endpoint - api endpoint
   * @returns {Promise<Number, Error>} Number of request left
   */
  rateLimiter(method, endpoint) {

    return new Promise((resolve, reject) => {
      var limiter = null;

      if (endpoint === endpoints.AUTHENTICATION_SERVICE) {
        limiter = this.authLimiter;
      } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        limiter = this.writeLimiter;
      } else if (method === 'GET') {
        limiter = this.readLimiter;
      } else {
        return resolve();
      }

      limiter.removeTokens(1, (err, remainingRequests) => {
        if (err) {
          return reject(err);
        }

        resolve(remainingRequests);
      });
    });
  }

  /**
   * Request client function
   *
   * Adds rate limit and ensures refresh token is valid
   *
   * @method request
   * @extends Transport.request
   * @private
   * @see {@link uri} for possible endpoints.
   * @params {string} method - Request method
   * @params {string} endpoint - api endpoint
   * @params {object} [args={}] - arguments
   * @returns {Promise<Object, Error>} Response body
   */
  request(...args) {
    var [method, endpoint] = args;

    return this.rateLimiter(method, endpoint)
        .then(() => {
          // check if token is still valid
          if (endpoint !== endpoints.AUTHENTICATION_SERVICE && this.isExpired()) {
            return this.refreshToken()
                .then(super.request(...args));
          }

          return super.request(...args);
        });
  }
}

export default Client;