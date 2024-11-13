const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const target = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://react-express-ecom-shop-api.vercel.app/'
      : 'http://host.docker.internal:5000');

  const proxy = createProxyMiddleware('/api', {
    target,
    changeOrigin: true,
  });
  app.use(proxy);
};
