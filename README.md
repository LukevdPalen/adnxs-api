[![Build Status](https://travis-ci.org/freshfruitdigital/adnxs-api.svg?branch=master)](https://travis-ci.org/freshfruitdigital/adnxs-api)
[![npm version](https://badge.fury.io/js/adnxs-api.svg)](http://badge.fury.io/js/adnxs-api)
# adnxs-api

> adnxs-api is an AppNexus client, source written in es6

## Install

 	$ npm install adnxs-api --save

## Examples

### Authorization
```javascript
	var Client =  require('adnxs-api').Client;

	var client = new Client();
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
	var Client =  require('adnxs-api').Client;
	var endpoints =  require('adnxs-api').endpoints;

	var client = new Client();
	
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
