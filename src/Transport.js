/**
 * Created by Luke on 01/05/15.
 */
import * as rp from 'request-promise';
import {responseContainsError, handleErrorResponse} from './utils/ErrorHandlers';


/**
 * AppNexus Transport class.
 * @class Transport
 * @classdesc The transport is responsible for handling al request to the AppNexus api service
 */
class Transport{
    /**
     * Transport constructor.
     * @constructs Transport
     * @params {object} [options={}] - transport options
     */
    constructor(options = {}){

        /**
         * Transport options
         * @member Client#options
         */
        this.options = options;

        this.options.apiBase = this.options.apiBase || '/';
    }

    /**
     * Preform a GET request
     *
     * @method get
     * @see {@link uri} for possible endpoints.
     * @params {string} endpoint - api endpoint
     * @params {object} [args={}] - arguments
     * @returns {Promise<Object, Error>} Response body
     **/
    get(endpoint, args={}){
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
     **/
    put(endpoint, args={}){
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
     **/
    post(endpoint, args={}){
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
     **/
    delete(endpoint, args={}){
        return this.request('DELETE', endpoint, args);
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
     **/
    request(method, endpoint, args){

        var payload = {
            uri : this.options.apiBase + endpoint,
            json: args,
            method
        };

        if(this.options.token){
            payload.headers = {
                'Authorization': this.options.token
            };
        }

        return rp(payload)
            .then((body)=>{
                if(responseContainsError(body)){ throw handleErrorResponse(body);}
                return body.response;
            });
    }
}

export default Transport;
