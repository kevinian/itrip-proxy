/**
 * Proxy Server
 * TODO: use `http-proxy` module as load balancer.
 *       use `http-master` module as reverse proxy. [http-master](https://github.com/CodeCharmLtd/http-master)
 */
var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

var router = {
  'itrip.com:8080':                'http://127.0.0.1:8081',
  'www.itrip.com:8080':            'http://127.0.0.1:8081',
  'dianping.itrip.com:8080':       'http://127.0.0.1:8082',
  'forum.itrip.com:8080':          'http://127.0.0.1:8083',
  'blog.itrip.com:8080':           'http://127.0.0.1:8084',
}

http.createServer(function(req, res) {
  proxy.web(req, res, {
    target: router[req.headers.host]
  });
}).listen(8080);

console.log('Proxy Server Listening on port 8080');
