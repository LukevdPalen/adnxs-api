var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('limiter'), require('request-promise')) : typeof define === 'function' && define.amd ? define(['exports', 'limiter', 'request-promise'], factory) : factory(global.AddNXS = {}, global._limiter, global.request_promise);
})(this, function (exports, _limiter, request_promise) {
    'use strict';

    /**
     * Created by Luke on 01/05/15.
     */

    var _endpoints__endpoints = {

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

    var _endpoints = _endpoints__endpoints;

    /*jshint camelcase: false */

    /**
     * Created by Luke on 01/05/15.
     */

    function responseContainsError(body) {
        if (body.response.status !== 'OK') {
            return true;
        }
        return false;
    }

    function wrapAppnexusError(body) {
        var error = new Error(body && body.response && body.response.error);
        error.error_id = body && body.response && body.response.error_id;
        return error;
    }

    function handleErrorResponse(body, eventEmitter, callback) {
        var error = wrapAppnexusError(body);
        //if (error.error_id) {
        //    //eventEmitter.emit(error.error_id, body.response);
        //}
        //return callback(error);

        return error;
    }

    /**
     * Created by Luke on 01/05/15.
     */
    var MAX_WRITE_PER_MIN = 60;

    /** @constant {number} */
    var MAX_READ_PER_MIN = 100;

    /**
     * AppNexus Transport class.
     * @class Transport
     * @classdesc The transport is responsible for handling al request to the AppNexus api service
     */

    var Transport = (function () {
        /**
         * Transport constructor.
         * @constructs Transport
         * @params {object} [options={}] - transport options
         */

        function Transport() {
            var options = arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, Transport);

            /**
             * Transport options
             * @member Client#options
             */
            this.options = options;

            this.options.apiBase = this.options.apiBase || '/';
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
            key: 'request',

            ///**
            // * Preform a DELETE request
            // *
            // * @method delete
            // * @see {@link uri} for possible endpoints.
            // * @params {string} endpoint - api endpoint
            // * @params {object} [args={}] - arguments
            // * @returns {Promise<Object, Error>} Response body
            // **/
            //delete(endpoint, args={}){
            //    return this.request('DELETE', endpoint, args);
            //}

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
                    uri: this.options.apiBase + endpoint,
                    json: args,
                    method: method
                };

                if (this.options.token) {
                    payload.headers = {
                        Authorization: this.options.token
                    };
                }

                return request_promise__default(payload).then(function (body) {
                    if (responseContainsError(body)) {
                        throw handleErrorResponse(body);
                    }
                    return body.response;
                });
            }
        }]);

        return Transport;
    })();

    var _Transport = Transport;

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
         * @params {string} [apiBase=http://api.appnexus.com] - default api domain
         */

        function Client() {
            var apiBase = arguments[0] === undefined ? 'http://api.appnexus.com' : arguments[0];
            var limits = arguments[1] === undefined ? {} : arguments[1];

            _classCallCheck(this, Client);

            _get(Object.getPrototypeOf(Client.prototype), 'constructor', this).call(this);
            this.options = { apiBase: apiBase, limits: limits };

            /* Set limiters */
            this.writeLimiter = new _limiter.RateLimiter(limits.write || MAX_WRITE_PER_PERIOD, MAX_WRITE_PERIOD);
            this.readLimiter = new _limiter.RateLimiter(limits.read || MAX_READ_PER_PERIOD, MAX_READ_PERIOD);
            this.authLimiter = new _limiter.RateLimiter(limits.auth || MAX_AUTH_PER_PERIOD, MAX_AUTH_PERIOD);
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
                var _this2 = this;

                if (!username || !password) {
                    throw Error('Authorization credentials are missing!');
                }

                credentials = { username: username, password: password };

                var data = {
                    auth: credentials
                };

                if (this.options.token) {
                    delete this.options.token;
                }

                return this.post(_endpoints.AUTHENTICATION_SERVICE, data).then(function (response) {
                    console.log(response);

                    _this2.options.token = { value: response.token, _ts: +new Date() };
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
                    throw Error('Authorization credentials are missing!');
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
                return !!(this.options.token && this.options.token._ts + TOKEN_LIFETIME >= +new Date());
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
                var _this3 = this;

                return new Promise(function (resolve, reject) {
                    var limiter = null;

                    if (endpoint === _endpoints.AUTHENTICATION_SERVICE) {
                        limiter = _this3.authLimiter;
                    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
                        limiter = _this3.writeLimiter;
                    } else if (method === 'GET') {
                        limiter = _this3.readLimiter;
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
                var _this4 = this;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var _this = this;

                var method = args[0],
                    endpoint = args[1];

                return this.rateLimiter(method, endpoint).then(function () {
                    // check if token is still valid
                    if (endpoint !== _endpoints.AUTHENTICATION_SERVICE && _this4.isExpired()) {
                        return _this4.refreshToken().then(_get(Object.getPrototypeOf(Client.prototype), 'request', _this).apply(_this, args));
                    }

                    return _get(Object.getPrototypeOf(Client.prototype), 'request', _this).apply(_this, args);
                });
            }
        }]);

        return Client;
    })(_Transport);

    var _Client = Client;

    /**
     * Created by Luke on 01/05/15.
     */

    var endPoints__endpoints = {

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

    var endPoints = endPoints__endpoints;

    /**
     * Created by Luke on 01/05/15.
     */

    var AppNxs = {
        Client: Client,
        Transport: Transport,
        endPoints: endPoints
    };

    var index = AppNxs;

    exports['default'] = index;
});
//# sourceMappingURL=./appnxs-lib-dist.js.map