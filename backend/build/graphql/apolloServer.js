"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _prisma = _interopRequireDefault(require("../prisma/prisma"));

var _schema = _interopRequireDefault(require("./schema"));

var server = function server() {
  var development = process.env.NODE_ENV === 'development';
  return new _apolloServerExpress.ApolloServer({
    schema: _schema["default"],
    context: function () {
      var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var req, res, accessToken;
        return _regenerator["default"].wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                req = _ref.req, res = _ref.res;
                accessToken = req.cookies.at;
                return _context2.abrupt("return", {
                  req: req,
                  res: res,
                  prisma: _prisma["default"],
                  accessToken: accessToken
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee);
      }));

      function context(_x) {
        return _context.apply(this, arguments);
      }

      return context;
    }(),
    tracing: development,
    debug: development,
    introspection: development,
    playground: development && {
      settings: {
        'editor.theme': 'light',
        'request.credentials': 'include'
      }
    }
  });
};

var _default = server;
exports["default"] = _default;
//# sourceMappingURL=apolloServer.js.map