/**
 * Created by LukevdPalen on 01/05/15.
 */

export function responseContainsError(body) {
  return body === Object(body)
      && body.response
        && (!body.response.status
          || (body.response.status
          && body.response.status !== 'OK'));
}

export function wrapError(error) {
  return Object.assign(error, {
    message: `${error.statusCode} - ${error.response.error || error.response.statusMessage}`,
  });
}

export function ErrorResponse(body) {
  const error = wrapError(body);
  return error;
}

export function clientError(response) {
  return response.statusCode >= 400 && response.statusCode < 500;
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
    this.message = `${statusCode} - ${message}`;
  }
}
