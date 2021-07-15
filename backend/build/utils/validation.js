"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.isPasswordWellFormed = exports.isEmailWellFormed = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _isemail = _interopRequireDefault(require("isemail"));

var _config = require("../config");

/* Email */
var isEmailWellFormed = function isEmailWellFormed(email) {
  var isvalid = _isemail["default"].validate(email);

  if (!isvalid) throw new _apolloServerExpress.UserInputError({
    error: 'email.invalid'
  });
};
/* Password */


exports.isEmailWellFormed = isEmailWellFormed;

var isPasswordWellFormed = function isPasswordWellFormed(password) {
  /*
  https://regexr.com/3bfsi
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  - within min & max characters
  */
  var tooShort = password.length < _config.passwordMinLength;
  if (tooShort) throw new _apolloServerExpress.UserInputError("Password must have at least ".concat(_config.passwordMinLength, " characters"));
  var tooLong = password.length > _config.passwordMaxLength;
  if (tooLong) throw new _apolloServerExpress.UserInputError("Password must have no more than ".concat(_config.passwordMaxLength, " characters"));
};

exports.isPasswordWellFormed = isPasswordWellFormed;

var validatePassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(inputPassword, hashedPassword) {
    var isCorrectPass;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].compare(inputPassword, hashedPassword);

          case 2:
            isCorrectPass = _context.sent;

            if (isCorrectPass) {
              _context.next = 5;
              break;
            }

            throw new _apolloServerExpress.UserInputError('login.invalidCredentials');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validatePassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.validatePassword = validatePassword;
//# sourceMappingURL=validation.js.map