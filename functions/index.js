const functions = require('firebase-functions');
const express = require('express');
const config = require('config');

const app = express();

app.get('/testkek', function (request, response) {
	console.log('config >>', config.token);
	console.log('in keks >>>');
	response.send('kek is working!');
});

exports.app = functions.https.onRequest(app);
