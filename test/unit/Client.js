/**
 * Created by Luke on 01/05/15.
 */
/*jshint nonew: false */

import {Client, endpoints} from '../../src/index';

var client;

describe('Client', () => {

  beforeEach(() => {
    client = new Client('http://sand.api.appnexus.com');
  });

  describe('options', () => {
    it('should use the sandbox', () => {
      return expect(client.options.apiBase).to.equals('http://sand.api.appnexus.com');
    });
  });

  describe('helpers check', () => {
    it('should tell me the token is expired', () => {
      client.options.token = {_ts: +new Date() - 60 * 60 * 1000, token: 'blaa'};

      return expect(client.isExpired()).to.be.true;
    });

    it('should tell me the token is not expired', () => {
      client.options.token = {_ts: +new Date() - 10, token: 'blaa'};
      return expect(client.isExpired()).to.be.false;
    });
  });

  describe('authorization', () => {
    var authorize;

    beforeEach(() => {
      authorize = client.authorize(process.env.APPNEXUS_USERNAME, process.env.APPNEXUS_PASSWORD);
    });

    it('should preform an successful auth', () => {
      return expect(authorize).to.eventually.be.fullfilled;
    });

    it('should throw an error when credentials are missing', () => {
      return expect(client.authorize).to.throw(Error, 'Authorization credentials are missing!');
    });
  });

  describe('RateLimit', () => {

    beforeEach(() => {
      client = new Client(null, {auth: 1, write: 2, read: 3});
    });

    it('should use the custom write limits', () => {
      return expect(client.options.limits.auth).to.equals(1);
    });

    it('should use the custom read limits', () => {
      return expect(client.options.limits.write).to.equals(2);
    });

    it('should use the custom write limits', () => {
      return expect(client.options.limits.read).to.equals(3);
    });

    it('should limit auth requests', () => {
      var promise = client.rateLimiter('POST', endpoints.AUTHENTICATION_SERVICE);
      return expect(promise).to.eventually.equal(0);
    });

    it('should limit get requests', () => {
      var promise = client.rateLimiter('POST', '');
      return expect(promise).to.eventually.equal(1);
    });

    it('should limit post requests', () => {
      var promise = client.rateLimiter('GET', '');
      return expect(promise).to.eventually.equal(2);
    });
  });
});
