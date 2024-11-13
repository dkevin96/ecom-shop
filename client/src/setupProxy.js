const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const proxy = createProxyMiddleware('/api', {
    target: 'http://host.docker.internal:5000',
    changeOrigin: true,
  });
  app.use(proxy);
};
