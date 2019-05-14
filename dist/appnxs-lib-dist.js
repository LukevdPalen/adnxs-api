(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('limiter'), require('request')) :
  typeof define === 'function' && define.amd ? define(['exports', 'limiter', 'request'], factory) :
  (global = global || self, factory(global.appnxs = {}, global.limiter, global.request));
}(this, function (exports, limiter, request) { 'use strict';

  request = request && request.hasOwnProperty('default') ? request['default'] : request;

  /**
   * Created by Luke on 01/05/15.
   */

  const endpoints = {

    /**
     * source: https://wiki.appnexus.com/display/api/API+Services
     */

    ACCOUNT_RECOVERY_SERVICE: '/account-recovery',
    AD_PROFILE_SERVICE: '/ad-profile',
    AD_QUALITY_RULE_SERVICE: '/ad-quality-rule',
    AD_SERVER_SERVICE: '/ad-server',
    ADVERTISER_SERVICE: '/advertiser',
    APP_INSTALLATION_SERVICE: '/app-installation',
    AUTHENTICATION_SERVICE: '/auth',
    BATCH_SEGMENT_SERVICE: '/batch-segment',
    BRAND_COMPANY_SERVICE: '/brand-company',
    BRAND_SERVICE: '/brand',
    BROKER_SERVICE: '/broker',
    BROWSER_SERVICE: '/browser',
    CAMPAIGN_SERVICE: '/campaign',
    CARRIER_SERVICE: '/carrier',
    CATEGORY_SERVICE: '/category',
    CITY_SERVICE: '/city',
    CLICK_TRACKER_SERVICE: '/clicktracker',
    CONTENT_CATEGORY_SERVICE: '/content-category',
    COUNTRY_SERVICE: '/country',
    CREATIVE_CUSTOM_REQUEST_TEMPLATE_SERVICE: '/creative-custom-request-template',
    CREATIVE_CUSTOM_REQUEST_TEMPLATE_TYPE_SERVICE: '/creative-custom-request-template-type',
    CREATIVE_FOLDER_SERVICE: '/creative-folder',
    CREATIVE_FORMAT_SERVICE: '/creative-format',
    CREATIVE_MACRO_CHECK_SERVICE: '/creative-macro-check',
    CREATIVE_SEARCH_SERVICE: '/creative-search',
    CREATIVE_SERVICE: '/creative',
    CREATIVE_TEMPLATE_SERVICE: '/template',
    CURRENCY_SERVICE: '/currency',
    DEAL_BUYER_ACCESS_SERVICE: '/package-buyer-access',
    DEAL_FROM_PACKAGE_SERVICE: '/deal-from-package',
    DEAL_SERVICE: '/deal',
    DEMOGRAPHIC_AREA_SERVICE: '/dma',
    DEVELOPER_SERVICE: '/developer',
    DEVICE_MAKE_SERVICE: '/device-make',
    DEVICE_MODEL_SERVICE: '/device-model',
    DOMAIN_AUDIT_STATUS_SERVICE: '/url-audit-search',
    DOMAIN_LIST_SERVICE: '/domain-list',
    EXTERNAL_INVENTORY_CODE_SERVICE: '/external-inv-code',
    EXTRACT_CLICKTAGS_SERVICE: '/extract-click-tags',
    FEED_STATUS_SERVICE: '/feed-status',
    IMPRESSION_TRACKER_SERVICE: '/imptracker',
    INSERTION_ORDER_SERVICE: '/insertion-order',
    INVENTORY_ATTRIBUTE_SERVICE: '/inventory-attribute',
    INVENTORY_GROUP_SERVICE: '/inventory-group',
    INVENTORY_RESOLD_SERVICE: '/inventory-resold',
    INVENTORY_SOURCE_SERVICE: '/inventory-source',
    IP_RANGE_LIST_SERVICE: '/ip-range-list',
    LABEL_SERVICE: '/label',
    LANGUAGE_SERVICE: '/language',
    LINE_ITEM_SERVICE: '/line-item',
    LOG_LEVEL_DATA_SERVICE: '/siphon',
    LOOKUP_SERVICE: '/lookup',
    MANUAL_OFFER_RANKING_SERVICE: '/manual-offer-ranking',
    MEDIA_SUBTYPE_SERVICE: '/media-subtype',
    MEDIA_TYPE_SERVICE: '/media-type',
    MEMBER_PROFILE_SERVICE: '/member-profile',
    MEMBER_SERVICE: '/member',
    MOBILE_APP_INSTANCE_LIST_SERVICE: '/mobile-app-instance-list',
    MOBILE_APP_INSTANCE_SERVICE: '/mobile-app-instance',
    MOBILE_APP_SERVICE: '/mobile-app',
    MOBILE_APP_STORE_SERVICE: '/mobile-app-store',
    OBJECT_LIMIT_SERVICE: '/object-limit',
    OPERATING_SYSTEM_EXTENDED_SERVICE: '/operating-system-extended',
    OPERATING_SYSTEM_FAMILY_SERVICE: '/operating-system-family',
    OPERATING_SYSTEM_SERVICE: '/operating-system',
    OPTIMIZATION_ZONE_SERVICE: '/optimization-zone',
    PACKAGE_BUYER_ACCESS_SERVICE: '/package-buyer-access',
    PACKAGE_SERVICE: '/package',
    PAYMENT_RULE_SERVICE: '/payment-rule',
    PIXEL_SERVICE: '/pixel',
    PIXEL_TEMPLATE_SERVICE: '/pixel-template',
    PLACEMENT_SERVICE: '/placement',
    PLATFORM_MEMBER_SERVICE: '/platform-member',
    PLUGIN_INSTANCE_SERVICE: '/plugin-instance',
    PLUGIN_SERVICE: '/plugin',
    PROFILE_SERVICE: '/profile',
    PROFILE_SUMMARY_SERVICE: '/profile-summary',
    PUBLISHER_SERVICE: '/publisher',
    REGION_SERVICE: '/region',
    REPORT_SERVICE: '/report',
    REPORT_STATUS_SERVICE: '/report-status',
    SAVED_REPORT_SERVICE: '/saved-report',
    SEARCH_SERVICE: '/search',
    SEGMENT_SERVICE: '/segment',
    SIPHON_CONFIG_SERVICE: '/siphon-config',
    SITE_SERVICE: '/site',
    TAG_PARSER_SERVICE: '/tag-parser-job',
    TECHNICAL_ATTRIBUTE_SERVICE: '/technical-attribute',
    THIRD_PARTY_PAGE_ACCESS_SERVICE: '/thirdparty-pageaccess',
    THIRD_PARTY_PIXEL_SERVICE: '/thirdparty-pixel',
    TOWN_SERVICE: '/town',
    USER_GROUP_PATTERN_SERVICE: '/usergroup-pattern',
    USER_SERVICE: '/user',
    USER_VERIFICATION_SERVICE: '/user-verification',
    VISIBILITY_PROFILE_SERVICE: '/visibility-profile',
  };

  /**
   * Created by LukevdPalen on 01/05/15.
   */

  function responseContainsError(body) {
    return body === Object(body)
        && body.response
          && (!body.response.status
            || (body.response.status
            && body.response.status !== 'OK'));
  }

  function clientError(response) {
    return response.statusCode >= 400 && response.statusCode < 500;
  }

  class RequestError extends Error {
    constructor(cause) {
      super();
      this.name = 'RequestError';
      this.message = String(cause);
      this.cause = cause;
    }
  }

  class StatusCodeError extends Error {
    constructor(statusCode, message) {
      super();
      this.name = 'StatusCodeError';
      this.statusCode = statusCode;
      this.message = `${statusCode} - ${message}`;
    }
  }

  /* eslint class-methods-use-this: off */

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
    put(endpoint, args = {}) {
      return this.request('PUT', endpoint, args);
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
    post(endpoint, args = {}) {
      return this.request('POST', endpoint, args);
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
    delete(endpoint, args = {}) {
      return this.request('DELETE', endpoint, args);
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
    request(method, endpoint, args) {
      const payload = {
        method,
        uri: this.options.apiBase + endpoint,
      };

      if (this.options.proxy) {
        payload.proxy = this.options.proxy;
      }

      if (method === 'GET') {
        payload.json = true;
        payload.qs = args;
      } else {
        payload.json = args;
      }

      if (this.options.token && this.options.token.value) {
        payload.headers = {
          Authorization: this.options.token.value,
        };
      }

      return this.requestPromise(payload)
        .then(([body]) => body.response);
    }
  }

  /**
   * Created by Luke on 01/05/15.
   */

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
  let credentials = {};

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
     * @params {string} [apiBase=https://api.appnexus.com] - default api domain
     * @params {string} [proxy=null] - proxy url
     * @params {object} [limits={}] - rate limits
     */
    constructor(apiBase = 'https://api.appnexus.com',
      proxy = null,
      limits = {
        write: MAX_WRITE_PER_PERIOD,
        read: MAX_READ_PER_PERIOD,
        auth: MAX_AUTH_PER_PERIOD,
      }) {
      super();
      this.options = { apiBase, limits, proxy };

      /* Set limiters */
      this.writeLimiter = new limiter.RateLimiter(limits.write, MAX_WRITE_PERIOD);
      this.readLimiter = new limiter.RateLimiter(limits.read, MAX_READ_PERIOD);
      this.authLimiter = new limiter.RateLimiter(limits.auth, MAX_AUTH_PERIOD);
    }

    /**
     * Authorize client function
     *
     * @method authorize
     * @params {string} username - Username
     * @params {string} password - Password
     * @returns {Promise<String, Error>} AppNexus Access Token
     */
    async authorize(username, password) {
      if (!username || !password) {
        throw new Error('Authorization credentials are missing!');
      }

      credentials = { username, password };

      if (this.options.token) {
        delete this.options.token;
      }

      const response = await this.post(endpoints.AUTHENTICATION_SERVICE, { auth: credentials });
      this.options.token = { value: response.token, _ts: +new Date() };
      return response.token;
    }

    /**
     * Refresh token
     **
     * @method refreshToken
     * @returns {Promise<String, Error>} AppNexus Access Token
     */
    refreshToken() {
      if (!credentials.username || !credentials.password) {
        throw new Error('Authorization credentials are missing!');
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
      const timestamp = this.options.token
                      && this.options.token._ts
        ? this.options.token._ts : ts;

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
        let limiter = null;

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
    async request(...args) {
      const [method, endpoint] = args;

      await this.rateLimiter(method, endpoint);
      // check if token is still valid
      if (endpoint !== endpoints.AUTHENTICATION_SERVICE
        && this.isExpired()) {
        return this.refreshToken()
          .then(super.request(...args));
      }
      return super.request(...args);
    }
  }

  /**
   * Created by Luke on 01/05/15.
   */

  exports.Client = Client;
  exports.Transport = Transport;
  exports.endpoints = endpoints;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=appnxs-lib-dist.js.map
