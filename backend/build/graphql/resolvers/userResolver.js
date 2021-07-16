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
                console.log('ctx.accessToken:', ctx.accessToken); // Verify access token and decode payload

                payload = (0, _accessToken.verifyAccessToken)(ctx.accessToken);
                console.log('payload:', payload);
                _context3.prev = 5;
                _context3.next = 8;
                return ctx.prisma.user.findUnique({
                  where: {
                    id: payload.userId
                  }
                });

              case 8:
                userRecord = _context3.sent;
                console.log('userRecord:', userRecord); // If no user found, return error

                if (userRecord) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", (0, _apolloServerExpress.AuthenticationError)('user.notFound'));

              case 12:
                // Create new access token
                accessToken = (0, _accessToken.createAccessToken)(userRecord.id);
                console.log('accessToken:', accessToken);
                console.log('cookieOptions:', _config.cookieOptions); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.cookieOptions); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(userRecord);
                console.log('clientUserData:', clientUserData); // Return user data

                return _context3.abrupt("return", clientUserData);

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](5);
                console.log('user.currentUser error: ', _context3.t0);
                return _context3.abrupt("return", {});

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 21]]);
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
                email = args.email, password = args.password;
                console.log('email:', email);
                console.log('password:', password); // Check if missing args

                if (email || password) {
                  _context4.next = 5;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('error.missingArgument');

              case 5:
                _i = 0, _arr = [email, password];

              case 6:
                if (!(_i < _arr.length)) {
                  _context4.next = 13;
                  break;
                }

                input = _arr[_i];

                if (!(typeof input !== 'string')) {
                  _context4.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('error.invalidArgument');

              case 10:
                _i++;
                _context4.next = 6;
                break;

              case 13:
                // Normalize email
                emailNormalized = email.trim().toLowerCase();
                console.log('emailNormalized:', emailNormalized); // Normalize password

                passwordNormalized = email.trim();
                console.log('passwordNormalized:', passwordNormalized); // Check if email is well-formed

                (0, _validation.isEmailWellFormed)(emailNormalized); // Check if password is well-formed

                (0, _validation.isPasswordWellFormed)(passwordNormalized); // Find user matching email

                _context4.next = 21;
                return ctx.prisma.user.findUnique({
                  where: {
                    email: emailNormalized
                  }
                });

              case 21:
                foundUser = _context4.sent;
                console.log('foundUser:', foundUser); // If user found, return error

                if (!foundUser) {
                  _context4.next = 25;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('email.invalid');

              case 25:
                _context4.next = 27;
                return _bcryptjs["default"].hash(passwordNormalized, _config.saltRounds);

              case 27:
                passwordHashed = _context4.sent;
                console.log('passwordHashed:', passwordHashed);
                _context4.prev = 29;
                _context4.next = 32;
                return ctx.prisma.user.create({
                  data: {
                    email: emailNormalized,
                    password: passwordHashed
                  }
                });

              case 32:
                newUserRecord = _context4.sent;
                console.log('newUserRecord:', newUserRecord); // Create access token

                accessToken = (0, _accessToken.createAccessToken)(newUserRecord.id);
                console.log('accessToken:', accessToken); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.cookieOptions);
                console.log('cookieOptions:', _config.cookieOptions); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(newUserRecord);
                console.log('clientUserData:', clientUserData); // Return user data

                return _context4.abrupt("return", clientUserData);

              case 43:
                _context4.prev = 43;
                _context4.t0 = _context4["catch"](29);
                console.log('user.signUp error: ', _context4.t0);
                return _context4.abrupt("return", {});

              case 47:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[29, 43]]);
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
                email = args.email, password = args.password;
                console.log('email:', email);
                console.log('password:', password); // Check if missing args

                if (!(!email || !password)) {
                  _context5.next = 5;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.missingCredentials');

              case 5:
                _i2 = 0, _arr2 = [email, password];

              case 6:
                if (!(_i2 < _arr2.length)) {
                  _context5.next = 13;
                  break;
                }

                input = _arr2[_i2];

                if (!(typeof input !== 'string')) {
                  _context5.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('error.invalidArgument');

              case 10:
                _i2++;
                _context5.next = 6;
                break;

              case 13:
                // Normalize email
                emailNormalized = email.trim().toLowerCase();
                console.log('emailNormalized:', emailNormalized); // Normalize password

                passwordNormalized = email.trim();
                console.log('passwordNormalized:', passwordNormalized); // Check if email is well-formed

                (0, _validation.isEmailWellFormed)(emailNormalized); // Check if password is well-formed

                (0, _validation.isPasswordWellFormed)(passwordNormalized);
                _context5.prev = 19;
                _context5.next = 22;
                return ctx.prisma.user.findUnique({
                  where: {
                    email: email
                  }
                });

              case 22:
                userRecord = _context5.sent;
                console.log('userRecord:', userRecord); // If user not found, return error

                if (userRecord) {
                  _context5.next = 26;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('login.invalidCredentials');

              case 26:
                // Check if password input matches users password
                (0, _validation.validatePassword)(password, userRecord.password); // Create access token

                accessToken = (0, _accessToken.createAccessToken)(userRecord.id);
                console.log('accessToken:', accessToken);
                console.log('cookieOptions:', _config.cookieOptions); // Send back new access token

                ctx.res.cookie('at', accessToken, _config.cookieOptions); // Clean user data for client

                clientUserData = (0, _userClientCleaner["default"])(userRecord);
                console.log('clientUserData:', clientUserData); // Return user data

                return _context5.abrupt("return", {
                  user: clientUserData
                });

              case 36:
                _context5.prev = 36;
                _context5.t0 = _context5["catch"](19);
                console.log('user.logIn error: ', _context5.t0);
                return _context5.abrupt("return", {});

              case 40:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[19, 36]]);
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
      delete _config.cookieOptions.expires;
      delete _config.cookieOptions.maxAge;
      ctx.res.clearCookie('at', _config.cookieOptions);
      return true;
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=userResolver.js.map