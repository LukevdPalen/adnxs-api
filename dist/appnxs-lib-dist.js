var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x10, _x11, _x12) { var _again = true; _function: while (_again) { var object = _x10, property = _x11, receiver = _x12; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x10 = parent; _x11 = property; _x12 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('limiter'), require('bluebird'), require('request'), require('lodash')) : typeof define === 'function' && define.amd ? define(['exports', 'limiter', 'bluebird', 'request', 'lodash'], factory) : factory(global['null'] = {}, global._limiter, global.bluebird, global.request, global.lodash);
})(this, function (exports, _limiter, bluebird, request, lodash) {
  'use strict';

  request = 'default' in request ? request['default'] : request;

  /*jslint maxlen: 500 */
  /**
   * Created by Luke on 01/05/15.
   */

  var endpoints = {

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
    VISIBILITY_PROFILE_SERVICE: '/visibility-profile'

  };

  var Endpoints = endpoints;

  exports.endpoints = Endpoints;

  /*jshint camelcase: false */

  /**
   * Created by LukevdPalen on 01/05/15.
   */
  function responseContainsError(body) {
    'use strict';

    return lodash.isObject(body) && body.response && (!body.response.status || body.response.status && body.response.status !== 'OK');
  }

  function wrapError(error) {
    'use strict';

    error.message = error.statusCode + ' - ' + (error.response.error || error.response.statusMessage);
    return error;
  }

  function ErrorResponse(body) {
    'use strict';

    var error = wrapError(body);
    return error;
  }

  function clientError(response) {
    'use strict';

    return response.statusCode >= 400 && response.statusCode < 500;
  }

  var RequestError = (function (_Error) {
    function RequestError(cause) {
      _classCallCheck(this, RequestError);

      _get(Object.getPrototypeOf(RequestError.prototype), 'constructor', this).call(this);
      this.name = 'RequestError';
      this.message = String(cause);
      this.cause = cause;
    }

    _inherits(RequestError, _Error);

    return RequestError;
  })(Error);

  var StatusCodeError = (function (_Error2) {
    function StatusCodeError(statusCode, message) {
      _classCallCheck(this, StatusCodeError);

      _get(Object.getPrototypeOf(StatusCodeError.prototype), 'constructor', this).call(this);
      this.name = 'StatusCodeError';
      this.statusCode = statusCode;
      this.message = statusCode + ' - ' + message;
    }

    _inherits(StatusCodeError, _Error2);

    return StatusCodeError;
  })(Error);

  /**
   * Created by Luke on 01/05/15.
   */

  var Transport = (function () {
    /**
     * Transport constructor.
     * @constructs Transport
     * @params {object} [options={}] - transport options
     */

    function Transport() {
      var options = arguments[0] === undefined ? { apiBase: '/' } : arguments[0];

      _classCallCheck(this, Transport);

      /**
       * Transport options
       * @member Client#options
       */
      this.options = options;
    }

    _createClass(Transport, [{
      key: 'get',

      /**
       * Preform a GET request
       *
       * @method get
       * @see {@link uri} for possible endpoints.
       * @params {string} endpoint - api endpoint
       * @params {object} [args={}] - arguments
       * @returns {Promise<Object, Error>} Response body
       **/
      value: function get(endpoint) {
        var args = arguments[1] === undefined ? {} : arguments[1];

        return this.request('GET', endpoint, args);
      }
    }, {
      key: 'put',

      /**
       * Preform a PUT update request
       *
       * @method put
       * @see {@link uri} for possible endpoints.
       * @params {string} endpoint - api endpoint
       * @params {object} [args={}] - arguments
       * @returns {Promise<Object, Error>} Response body
       **/
      value: function put(endpoint) {
        var args = arguments[1] === undefined ? {} : arguments[1];

        return this.request('PUT', endpoint, args);
      }
    }, {
      key: 'post',

      /**
       * Preform a POST request
       *
       * @method post
       * @see {@link uri} for possible endpoints.
       * @params {string} endpoint - api endpoint
       * @params {object} [args={}] - arguments
       * @returns {Promise<Object, Error>} Response body
       **/
      value: function post(endpoint) {
        var args = arguments[1] === undefined ? {} : arguments[1];

        return this.request('POST', endpoint, args);
      }
    }, {
      key: 'delete',

      /**
       * Preform a DELETE request
       *
       * @method delete
       * @see {@link uri} for possible endpoints.
       * @params {string} endpoint - api endpoint
       * @params {object} [args={}] - arguments
       * @returns {Promise<Object, Error>} Response body
       **/
      value: function _delete(endpoint) {
        var args = arguments[1] === undefined ? {} : arguments[1];

        return this.request('DELETE', endpoint, args);
      }
    }, {
      key: 'requestPromise',
      value: function requestPromise(options) {
        return new bluebird.Promise(function (resolve, reject) {

          request(options, function (err, response, body) {
            if (err) {
              reject(new RequestError(err));
            } else if (clientError(response)) {
              var msg = body.response && body.response.error ? body.response.error : response.statusMessage;

              reject(new StatusCodeError(response.statusCode, msg));
            } else if (responseContainsError(body)) {
              var msg = body.response && body.response.error ? body.response.error : response.statusMessage;

              reject(new RequestError(Error(msg)));
            } else if (response.statusCode >= 500) {
              reject(new StatusCodeError(response.statusCode, response.statusMessage));
            } else {
              resolve([body, response]);
            }
          });
        });
      }
    }, {
      key: 'request',

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
       **/
      value: function request(method, endpoint, args) {

        var payload = {
          method: method,
          uri: this.options.apiBase + endpoint
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
            Authorization: this.options.token.value
          };
        }

        return this.requestPromise(payload).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1);

          var body = _ref2[0];

          return body.response;
        });
      }
    }]);

    return Transport;
  })();

  var _Transport = Transport;

  exports.Transport = _Transport;

  /**
   * Created by Luke on 01/05/15.
   */
  var MAX_AUTH_PERIOD = 300000;

  /** @constant {number} */
  var MAX_READ_PERIOD = 60000;

  /** @constant {number} */
  var MAX_WRITE_PERIOD = 60000;

  /** @constant {number} */
  var MAX_READ_PER_PERIOD = 100;

  /** @constant {number} */
  var MAX_WRITE_PER_PERIOD = 60;

  /** @constant {number} */
  var MAX_AUTH_PER_PERIOD = 10;

  /** @constant {number} */
  var TOKEN_LIFETIME = 60 * 60 * 1000;

  /** @private */
  var credentials = {};

  /**
   * AppNexus Client API class.
   *
   * @class Client
   * @extends Transport
   */

  var Client = (function (_Transport2) {

    /**
     * Client constructor.
     *
     * @constructs Client
     * @params {string} [apiBase=https://api.appnexus.com] - default api domain
     * @params {string} [proxy=null] - proxy url
     * @params {object} [limits={}] - rate limits
     */

    function Client() {
      var apiBase = arguments[0] === undefined ? 'https://api.appnexus.com' : arguments[0];
      var proxy = arguments[1] === undefined ? null : arguments[1];
      var limits = arguments[2] === undefined ? {
        write: MAX_WRITE_PER_PERIOD,
        read: MAX_READ_PER_PERIOD,
        auth: MAX_AUTH_PER_PERIOD
      } : arguments[2];

      _classCallCheck(this, Client);

      _get(Object.getPrototypeOf(Client.prototype), 'constructor', this).call(this);
      this.options = { apiBase: apiBase, limits: limits, proxy: proxy };

      /* Set limiters */
      this.writeLimiter = new _limiter.RateLimiter(limits.write, MAX_WRITE_PERIOD);
      this.readLimiter = new _limiter.RateLimiter(limits.read, MAX_READ_PERIOD);
      this.authLimiter = new _limiter.RateLimiter(limits.auth, MAX_AUTH_PERIOD);
    }

    _inherits(Client, _Transport2);

    _createClass(Client, [{
      key: 'authorize',

      /**
       * Authorize client function
       *
       * @method authorize
       * @params {string} username - Username
       * @params {string} password - Password
       * @returns {Promise<String, Error>} AppNexus Access Token
       */
      value: function authorize(username, password) {
        var _this = this;

        if (!username || !password) {
          throw new Error('Authorization credentials are missing!');
        }

        credentials = { username: username, password: password };

        if (this.options.token) {
          delete this.options.token;
        }

        return this.post(Endpoints.AUTHENTICATION_SERVICE, { auth: credentials }).then(function (response) {
          _this.options.token = { value: response.token, _ts: +new Date() };
          return response.token;
        });
      }
    }, {
      key: 'refreshToken',

      /**
       * Refresh token
       **
       * @method refreshToken
       * @returns {Promise<String, Error>} AppNexus Access Token
       */
      value: function refreshToken() {
        if (!credentials.username || !credentials.password) {
          throw new Error('Authorization credentials are missing!');
        }

        return this.authorize(credentials.username, credentials.password);
      }
    }, {
      key: 'isExpired',

      /**
       * Checks if request token is not expired
       **
       * @isExpired rateLimiter
       * @returns {boolean} token expired
       */
      value: function isExpired() {
        var ts = arguments[0] === undefined ? 0 : arguments[0];

        var timestamp = this.options.token && this.options.token._ts ? this.options.token._ts : ts;

        return timestamp + TOKEN_LIFETIME <= +new Date();
      }
    }, {
      key: 'rateLimiter',

      /**
       * Rate limit a request according to specs
       **
       * @method rateLimiter
       * @see {@link uri} for possible endpoints.
       * @params {string} method - Request method
       * @params {string} endpoint - api endpoint
       * @returns {Promise<Number, Error>} Number of request left
       */
      value: function rateLimiter(method, endpoint) {
        var _this2 = this;

        return new bluebird.Promise(function (resolve, reject) {
          var limiter = null;

          if (endpoint === Endpoints.AUTHENTICATION_SERVICE) {
            limiter = _this2.authLimiter;
          } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            limiter = _this2.writeLimiter;
          } else if (method === 'GET') {
            limiter = _this2.readLimiter;
          } else {
            return resolve();
          }

          limiter.removeTokens(1, function (err, remainingRequests) {
            if (err) {
              return reject(err);
            }

            resolve(remainingRequests);
          });
        });
      }
    }, {
      key: 'request',

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
      value: function request() {
        var _this3 = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var method = args[0];
        var endpoint = args[1];

        return this.rateLimiter(method, endpoint).then(function () {
          // check if token is still valid
          if (endpoint !== Endpoints.AUTHENTICATION_SERVICE && _this3.isExpired()) {

            return _this3.refreshToken().then(_get(Object.getPrototypeOf(Client.prototype), 'request', _this3).apply(_this3, args));
          }

          return _get(Object.getPrototypeOf(Client.prototype), 'request', _this3).apply(_this3, args);
        });
      }
    }]);

    return Client;
  })(_Transport);

  var _Client = Client;

  exports.Client = _Client;

  /**
   * Created by Luke on 01/05/15.
   */
});
//# sourceMappingURL=./appnxs-lib-dist.js.map