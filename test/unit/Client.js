/* eslint no-undef: off, no-unused-expressions: off */

/**
 * Created by Luke on 01/05/15.
 */

import { Client, endpoints } from '../../src/index';

/** @type{Client} */
let client;

describe('Client', () => {
  beforeEach(() => {
    client = new Client();
  });

  describe('options', () => {
    it('should use the sandbox', () => {
      expect(client.options.apiBase).to.equals('https://api.appnexus.com');
    });
  });

  describe('helpers check', () => {
    it('should tell me the token is expired', () => {
      client.options.token = { _ts: +new Date() - 60 * 60 * 1000, token: 'blaa' };

      expect(client.isExpired()).to.be.true;
    });

    it('should tell me the token is not expired', () => {
      client.options.token = { _ts: +new Date() - 10, token: 'blaa' };
      expect(client.isExpired()).to.be.false;
    });
  });

  describe('authorization', () => {
    if (typeof process.env.APPNEXUS_USERNAME === 'string'
    && typeof process.env.APPNEXUS_PASSWORD === 'string') {
      it('should preform an successful auth', () => {
        const authorize = client.authorize(
          process.env.APPNEXUS_USERNAME,
          process.env.APPNEXUS_PASSWORD,
        );
        expect(authorize).to.eventually.be.fullfilled;
      });
    }

    it('should throw an error when credentials are missing', () => {
      expect(client.authorize(null, null)).to.eventually.throw(Error, 'Authorization credentials are missing!');
    });
  });

  describe('RateLimit', () => {
    beforeEach(() => {
      client = new Client(null, null, {
        auth: 1,
        write: 2,
        read: 3,
      });
    });

    it('should use the custom write limits', () => {
      expect(client.options.limits.auth).to.equals(1);
    });

    it('should use the custom read limits', () => {
      expect(client.options.limits.write).to.equals(2);
    });

    it('should use the custom write limits', () => {
      expect(client.options.limits.read).to.equals(3);
    });

    it('should limit auth requests', () => {
      const promise = client.rateLimiter('POST', endpoints.AUTHENTICATION_SERVICE);
      expect(promise).to.eventually.equal(0);
    });

    it('should limit get requests', () => {
      const promise = client.rateLimiter('POST', '');
      expect(promise).to.eventually.equal(1);
    });

    it('should limit post requests', () => {
      const promise = client.rateLimiter('GET', '');
      expect(promise).to.eventually.equal(2);
    });
  });
});
