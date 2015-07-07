/*jshint camelcase: false */

/**
 * Created by LukevdPalen on 01/05/15.
 */
import * as _ from 'lodash';

export function responseContainsError(body) {
  'use strict';
  return _.isObject(body) &&
      body.response &&
      body.response.status &&
      body.response.status !== 'OK';
}

export function wrapError(error) {
  'use strict';

  error.message = `${error.statusCode} - ${error.response.error ||
                                           error.response.statusMessage}`;
  return error;
}

export function ErrorResponse(body) {
  'use strict';

  var error = wrapError(body);
  return error;
}

export function clientError(response) {
  'use strict';

  return response.statusCode >= 400 &&  response.statusCode < 500;
}

export class RequestError extends Error {

  constructor(cause) {
    super();

    this.name = 'RequestError';
    this.message = String(cause);
    this.cause = cause;

  }
}

export class StatusCodeError extends Error {

  constructor(statusCode, message) {
    super();
    this.name = 'StatusCodeError';
    this.statusCode = statusCode;
    this.message = statusCode + ' - ' + message;

  }
}
