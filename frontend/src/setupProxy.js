const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://analitic-system-backend:8000',
            changeOrigin: true,
        })
    );
};