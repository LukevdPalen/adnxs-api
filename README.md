[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

# adnxs-api

> adnxs-api is an AppNexus client, source written in es6

## Install

 	$ npm install adnxs-api --save

## Examples

### Authorization
```javascript
	const { Client } =  require('adnxs-api');

	const client = new Client();

	client
	.authorize('FFD', 'xxxxxxx')
	.then(function(token){
		//Do something funky..
		console.log(token)
	})
	.catch(function(err){
		console.log(err.stack)
	});
```

### Request all active campaigns
```javascript
	const { Client, endpoints } =  require('adnxs-api');

	const client = new Client();

	client
	.authorize('FFD', 'xxxxxxx') // optional
 	.then(function(token){
		return client.get(endpoints.CAMPAIGN_SERVICE, {state: 'active'});
	})
	.then(function(resp){
		console.log(resp)
	})
	.catch(function(err){
		console.log(err.stack)
	});

```
[npm-image]: https://badge.fury.io/js/adnxs-api.svg
[npm-url]: https://npmjs.org/package/adnxs-api
[downloads-image]: https://img.shields.io/npm/dm/adnxs-api.svg
[downloads-url]: https://npmjs.org/package/adnxs-api
[travis-image]: https://travis-ci.org/LukevdPalen/adnxs-api.svg?branch=master
[travis-url]: https://travis-ci.org/LukevdPalen/adnxs-api
