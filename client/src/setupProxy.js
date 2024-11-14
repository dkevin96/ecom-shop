const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Only set up proxy middleware in development
  if (process.env.NODE_ENV === "development") {
    const target = process.env.REACT_APP_API_URL;

    const proxy = createProxyMiddleware("/api", {
      target,
      changeOrigin: true,
    });
    app.use(proxy);
  }
};
