"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

require("ts-tiny-invariant");

var _apolloServer = _interopRequireDefault(require("./graphql/apolloServer"));

var _routes = _interopRequireDefault(require("./rest/routes"));

var _config = require("./config.js");

/*

https://expressjs.com/en/advanced/best-practice-security.html
https://expressjs.com/en/advanced/best-practice-performance.html

! must re-build server before pushing to vercel
* npm run build
? and start script

*/
// import createError from 'http-errors';
// In production, env vars are defined on the host
if (!production) require('dotenv').config();
var production = process.env.NODE_ENV === 'production';
var app = (0, _express["default"])();
app.use((0, _cors["default"])(_config.corsOptions)); // https://github.com/graphql/graphql-playground/issues/1283

app.use((0, _helmet["default"])({
  contentSecurityPolicy: production ? undefined : false
}));
app.use((0, _compression["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])(production ? 'combined' : 'dev'));
app.use('/', _routes["default"]); // // catch 404 and forward to error handler
// app.use((req, res, next) => next(createError(404)));
// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // return the error

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}); // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#start

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _apolloServer["default"].start();

        case 3:
          _apolloServer["default"].applyMiddleware({
            app: app,
            path: _config.graphqlPath,
            cors: _config.corsOptions
          });

          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('An error occurred while starting Apollo Server: ', _context.t0);
          process.exit(1);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))(); // ./bin/www.js not working on vercel

if (production) (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var httpServer, hostname, address, protocol, serverUrl;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          hostname = _config.deployedUrl || 'localhost';
          _context2.next = 4;
          return new Promise(function (resolve) {
            return httpServer = app.listen(_config.port, hostname, resolve);
          });

        case 4:
          _context2.next = 6;
          return httpServer.address();

        case 6:
          address = _context2.sent;
          protocol = production ? 'https' : 'http';
          serverUrl = "".concat(protocol, "://").concat(address.address, ":").concat(_config.port).concat(_apolloServer["default"].graphqlPath);
          console.log('🚀 Server ready at', serverUrl);
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error('An error occurred while starting the server: ', _context2.t0);
          process.exit(1);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[0, 12]]);
}))();
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map