const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const proxy = createProxyMiddleware("/api", {
    target: "http://localhost:5000",
    changeOrigin: true,
  });

  const socket = createProxyMiddleware("/socket.io", {
    target: "http://localhost:5000",
    changeOrigin: true,
    ws: true,
  });
  app.use(proxy);
};
