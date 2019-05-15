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

  describe('request options overload', () => {
    beforeEach(() => {
      jest
        .spyOn(client, 'request')
        .mockImplementation((method, endpoint, ...args) => {
          const payload = {};

          const [data, headers = {}, dataType = 'formData'] = args;

          if (method === 'GET') {
            payload.json = true;
            payload.qs = data;
          } else if ('Content-Type' in headers
            && typeof headers['Content-Type'] === 'string'
            && headers['Content-Type'] !== 'application/json') {
            payload[dataType] = data;
          } else {
            payload.json = data;
          }

          return Object.assign(payload, {
            method,
            uri: `example.com/${endpoint}`,
            headers,
          });
        });
    });

    it('should contain json in payload ', async () => {
      const payload = await client.request('POST', null);

      expect(payload).to.contain.keys('json');
    });

    it('should contain formData in payload when changing content-type (POST, PUT, DELETE)', async () => {
      let payload = await client.post(null, null, {
        'Content-Type': 'application/multipart',
      });

      expect(payload).to.contain.keys('formData');

      payload = await client.put(null, null, {
        'Content-Type': 'application/multipart',
      });

      expect(payload).to.contain.keys('formData');

      payload = await client.delete(null, null, {
        'Content-Type': 'application/multipart',
      });

      expect(payload).to.contain.keys('formData');

      payload = await client.request('OPTIONS', null, null, {
        'Content-Type': 'application/multipart',
      });

      expect(payload).to.contain.keys('formData');
    });

    it('should not contain formData in payload when changing content-type (GET)', async () => {
      let payload = await client.request('GET', null, null, {
        'Content-Type': 'application/multipart',
      });

      expect(payload).to.not.contain.keys('formData');

      payload = await client.get(null, { q: 'apple' });

      expect(payload.qs.q).to.equals('apple');
    });

    it('should contain custom payload key when changing content-type and overloading dataType', async () => {
      const payload = await client.request('POST', null, null, {
        'Content-Type': 'application/multipart',
      }, 'dataForm');

      expect(payload).to.contain.keys('dataForm');
    });

    afterAll(() => {
      jest.spyOn(client, 'request').mockRestore();
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
