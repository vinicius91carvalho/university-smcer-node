var http = require('http');
var app = require('./config/express')();
var os = require('os');

require('./config/passport')();
require('./config/database');

var ip = require('ip');

console.log(ip.address());

http.createServer(app)
	.listen(3000, ip.address(), function() {
    	console.log('Express Https Server');
});
