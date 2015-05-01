/*jshint camelcase: false */

/**
 * Created by Luke on 23/04/15.
 */

export function responseContainsError(body) {
    if (body.response.status !== 'OK') {
        return true;
    }
    return false;
}


export function wrapAppnexusError(body) {
    var error = new Error(body && body.response && body.response.error);
    error.error_id = body && body.response && body.response.error_id;
    return error;
}

export function handleErrorResponse(body, eventEmitter, callback) {
    var error = wrapAppnexusError(body);
    //if (error.error_id) {
    //    //eventEmitter.emit(error.error_id, body.response);
    //}
    //return callback(error);

    return error;
}

