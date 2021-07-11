"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _config = require("./config.js");

var _apolloServer = _interopRequireDefault(require("./graphql/apolloServer"));

var _routes = _interopRequireDefault(require("./rest/routes"));

/*

! must re-build server before pushing to vercel
? and start script
* npm run build

*/
var production = process.env.NODE_ENV === 'production'; // in production, env vars are defined on the host

if (!production) require('dotenv').config();
var app = (0, _express["default"])();
var server = (0, _apolloServer["default"])();
var corsOptions = {
  origin: _config.CORSwhitelist,
  credentials: true
};
app.use((0, _cors["default"])(corsOptions)); // https://github.com/graphql/graphql-playground/issues/1283

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
server.applyMiddleware({
  app: app,
  path: '/gql',
  cors: corsOptions
});
app.use('/', _routes["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  return next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // return the error

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}); // ./bin/www.js file doesn't work on vercel

if (production) {
  var port = process.env.PORT || '8008';
  app.listen({
    port: port
  }, function (err) {
    if (err) throw err;
    console.log('Server ready on port:', port);
  });
}

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map