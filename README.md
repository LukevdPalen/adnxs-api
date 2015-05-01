[![Build Status](https://travis-ci.org/freshfruitdigital/adnxs-api.svg?branch=master)](https://travis-ci.org/freshfruitdigital/adnxs-api)
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
			console.log(token)
			//Do something funky..
		})
		.catch(function(err){
				console.log(err.stack)
		});
```
