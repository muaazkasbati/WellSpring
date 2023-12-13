const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api/v1', 
    createProxyMiddleware({
      target: 'https://newson-health.trainmy.net', 
      changeOrigin: true,
      pathRewrite: {
        '^/api/v1': '/api/v1', 
      },
    })
  );
};




// For live environment
// const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = function (app) {
//   app.use(
//     '/api/v1', 
//     createProxyMiddleware({
//       target: 'https://your-live-api-server.com', 
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api/v1': '/api/v1', 
//       },
//     })
//   );
// };