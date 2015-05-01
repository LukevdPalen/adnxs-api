/*jshint camelcase: false */

/**
 * Created by Luke on 01/05/15.
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

export function handleErrorResponse(body) {
    var error = wrapAppnexusError(body);
    //if (error.error_id) {
    //    //eventEmitter.emit(error.error_id, body.response);
    //}
    //return callback(error);

    return error;
}

