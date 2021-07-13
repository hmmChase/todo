"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _accessToken = require("../../utils/accessToken");

var _userClientCleaner = _interopRequireDefault(require("../../utils/userClientCleaner"));

var _config = require("../../config");

var _validation = require("../../utils/validation");

var _default = {
  Query: {
    // Return user matching id
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, ctx, info) {
        var id, numId, userRecord, clientUserData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id; // Convert string to number

                numId = Number(id); // Check if missing args

                if (id) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('error.missingArgument');

              case 4:
                if (!(typeof numId !== 'number')) {
                  _context.next = 6;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('error.invalidArgument');

              case 6:
                _context.prev = 6;
                _context.next = 9;
                return ctx.prisma.user.findUnique({
                  where: {
                    id: numId
                  }
                });

              case 9:
                userRecord = _context.sent;
                // Clean user data for client
                clientUserData = (0, _userClientCleaner["default"])(userRecord); // Return user data

                return _context.abrupt("return", clientUserData);

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](6);
                console.log('user.user error: ', _context.t0);
                return _context.abrupt("return", {});

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 14]]);
      }));

      function user(_x, _x2, _x3, _x4) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    // Return all users
    users: function () {
      var _users = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, ctx, info) {
        var userRecords, clientUsersData;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return ctx.prisma.user.findMany();

              case 3:
                userRecords = _context2.sent;
                // Clean users data for client
                clientUsersData = userRecords.map(function (user) {
                  return (0, _userClientCleaner["default"])(user);
                }); // Return users data

                return _context2.abrupt("return", clientUsersData);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.log('user.users error: ', _context2.t0);
                return _context2.abrupt("return", {});

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function users(_x5, _x6, _x7, _x8) {
        return _users.apply(this, arguments);
      }

      return users;
    }(),
    // Return authenticated user
    currentUser: function () {
      var _currentUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, args, ctx, info) {
        var payload, userRecord, accessToken, clientUserData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (ctx.accessToken) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", new _apolloServerExpress.AuthenticationError('user.invalidCredentials'));

              case 2:
                // Verify access token and decode payload
                payload = (0, _accessToken.verifyAccessToken)(ctx.accessToken);
                _context3.prev = 3;
                _context3.next = 6;
                return ctx.prisma.user.findUnique({
                  where: {
                    id: payload.userId
                  }
                });

              case 6:
                userRecord = _context3.sent;

                if (userRecord) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", (0, _apolloServerExpress.AuthenticationError)('user.notFound'));

              case 9:
                // Create new access token
                accessToken = (0, _accessToken.createAccessToken)(userRecord.id); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.COOKIE_CONFIG); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(userRecord); // Return user data

                return _context3.abrupt("return", clientUserData);

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](3);
                console.log('user.currentUser error: ', _context3.t0);
                return _context3.abrupt("return", {});

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 15]]);
      }));

      function currentUser(_x9, _x10, _x11, _x12) {
        return _currentUser.apply(this, arguments);
      }

      return currentUser;
    }()
  },
  Mutation: {
    logIn: function () {
      var _logIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, args, ctx, info) {
        var email, password, userRecord, accessToken, clientUserData;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = args.email, password = args.password; // Check if missing args

                if (!(!email || !password)) {
                  _context4.next = 3;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.missingCredentials');

              case 3:
                if (!(!_validation.isEmailWellFormed || !_validation.isPasswordWellFormed)) {
                  _context4.next = 5;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.invalidCredentials');

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return ctx.prisma.user.findUnique({
                  where: {
                    email: email
                  }
                });

              case 8:
                userRecord = _context4.sent;
                console.log('userRecord:', userRecord); // If user not found, return error

                if (userRecord) {
                  _context4.next = 12;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.invalidCredentials');

              case 12:
                // Check if password input matches users password
                (0, _validation.validatePassword)(password, userRecord.password); // Create access token

                accessToken = (0, _accessToken.createAccessToken)(userRecord.id);
                console.log('accessToken:', accessToken); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.COOKIE_CONFIG); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(userRecord); // Return user data

                return _context4.abrupt("return", {
                  user: clientUserData
                });

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](5);
                console.log('user.login error: ', _context4.t0);
                return _context4.abrupt("return", {});

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 20]]);
      }));

      function logIn(_x13, _x14, _x15, _x16) {
        return _logIn.apply(this, arguments);
      }

      return logIn;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=userResolver.js.map