"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _accessToken = require("../../utils/accessToken");

var _userClientCleaner = _interopRequireDefault(require("../../utils/userClientCleaner"));

var _validation = require("../../utils/validation");

var _config = require("../../config");

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
                id = args.id; // Check if missing args

                if (id) {
                  _context.next = 3;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('error.missingArgument');

              case 3:
                // Convert string to number
                numId = Number(id); // Type check

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

                ctx.res.cookie('at', accessToken, _config.cookieOptions); // Clean user data for client

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
    signUp: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, args, ctx, info) {
        var email, password, _i, _arr, input, emailNormalized, passwordNormalized, foundUser, passwordHashed, newUserRecord, accessToken, clientUserData;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = args.email, password = args.password; // Check if missing args

                if (email || password) {
                  _context4.next = 3;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('error.missingArgument');

              case 3:
                _i = 0, _arr = [email, password];

              case 4:
                if (!(_i < _arr.length)) {
                  _context4.next = 11;
                  break;
                }

                input = _arr[_i];

                if (!(typeof input !== 'string')) {
                  _context4.next = 8;
                  break;
                }

                throw new UserInputError('error.invalidArgument');

              case 8:
                _i++;
                _context4.next = 4;
                break;

              case 11:
                // Normalize email
                emailNormalized = email.trim().toLowerCase(); // Normalize password

                passwordNormalized = email.trim(); // Check if email is well-formed

                (0, _validation.isEmailWellFormed)(emailNormalized); // Check if password is well-formed

                (0, _validation.isPasswordWellFormed)(passwordNormalized); // Find user matching email

                _context4.next = 17;
                return ctx.prisma.user.findUnique({
                  where: {
                    email: emailNormalized
                  }
                });

              case 17:
                foundUser = _context4.sent;

                if (!foundUser) {
                  _context4.next = 20;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError({
                  error: 'email.invalid'
                });

              case 20:
                _context4.next = 22;
                return _bcryptjs["default"].hash(passwordNormalized, _config.saltRounds);

              case 22:
                passwordHashed = _context4.sent;
                _context4.prev = 23;
                _context4.next = 26;
                return ctx.prisma.user.create({
                  data: {
                    email: emailNormalized,
                    password: passwordHashed
                  }
                });

              case 26:
                newUserRecord = _context4.sent;
                // Create access token
                accessToken = (0, _accessToken.createAccessToken)(newUserRecord.id); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.cookieOptions); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(newUserRecord); // Return user data

                return _context4.abrupt("return", clientUserData);

              case 33:
                _context4.prev = 33;
                _context4.t0 = _context4["catch"](23);
                console.log('user.signUp error: ', _context4.t0);
                return _context4.abrupt("return", {});

              case 37:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[23, 33]]);
      }));

      function signUp(_x13, _x14, _x15, _x16) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }(),
    logIn: function () {
      var _logIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, args, ctx, info) {
        var email, password, _i2, _arr2, input, emailNormalized, passwordNormalized, userRecord, accessToken, clientUserData;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = args.email, password = args.password; // Check if missing args

                if (!(!email || !password)) {
                  _context5.next = 3;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.missingCredentials');

              case 3:
                _i2 = 0, _arr2 = [email, password];

              case 4:
                if (!(_i2 < _arr2.length)) {
                  _context5.next = 11;
                  break;
                }

                input = _arr2[_i2];

                if (!(typeof input !== 'string')) {
                  _context5.next = 8;
                  break;
                }

                throw new UserInputError('error.invalidArgument');

              case 8:
                _i2++;
                _context5.next = 4;
                break;

              case 11:
                // Normalize email
                emailNormalized = email.trim().toLowerCase(); // Normalize password

                passwordNormalized = email.trim(); // Check if email is well-formed

                (0, _validation.isEmailWellFormed)(emailNormalized); // Check if password is well-formed

                (0, _validation.isPasswordWellFormed)(passwordNormalized);
                _context5.prev = 15;
                _context5.next = 18;
                return ctx.prisma.user.findUnique({
                  where: {
                    email: email
                  }
                });

              case 18:
                userRecord = _context5.sent;

                if (userRecord) {
                  _context5.next = 21;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.invalidCredentials');

              case 21:
                // Check if password input matches users password
                (0, _validation.validatePassword)(password, userRecord.password); // Create access token

                accessToken = (0, _accessToken.createAccessToken)(userRecord.id); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.cookieOptions); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(userRecord); // Return user data

                return _context5.abrupt("return", {
                  user: clientUserData
                });

              case 28:
                _context5.prev = 28;
                _context5.t0 = _context5["catch"](15);
                console.log('user.logIn error: ', _context5.t0);
                return _context5.abrupt("return", {});

              case 32:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[15, 28]]);
      }));

      function logIn(_x17, _x18, _x19, _x20) {
        return _logIn.apply(this, arguments);
      }

      return logIn;
    }(),
    logOut: function logOut(parent, args, ctx, info) {
      // const cookie = serialize('at', '', {
      //   maxAge: -1,
      //   path: '/'
      // });
      // ctx.res.setHeader('Set-Cookie', cookie);
      ctx.res.clearCookie('at', _config.cookieOptions);
      return true;
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=userResolver.js.map