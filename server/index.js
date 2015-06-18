
var express = require('express');
var cors = require('cors');
var path = require('path');
app = express();

app.use(cors());

app.get('/FactCalc', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/js/main.js', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../src/js/main.js'));
});

app.get('/css/main.css', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../src/css/main.css'));
});

app.get('/assets/ajax-loader.gif', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../assets/ajax-loader.gif'));
});

app.get('/assets/background.jpg', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../assets/background.jpg'));
});

app.listen(80, function() {
	console.log('CORS-enabled web server listening on port 80!');
});