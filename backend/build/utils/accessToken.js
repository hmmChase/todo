"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAccessToken = exports.createAccessToken = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

var createAccessToken = function createAccessToken(userId) {
  var secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');
  var options = {
    expiresIn: _config.accessTokenExpiryTime
  };
  return _jsonwebtoken["default"].sign({
    userId: userId
  }, secret, options);
};

exports.createAccessToken = createAccessToken;

var verifyAccessToken = function verifyAccessToken(accessToken) {
  var secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

  try {
    // Decode payload if signature is valid and JWT not expired
    var payload = _jsonwebtoken["default"].verify(accessToken, secret); // Return payload


    return payload;
  } catch (error) {
    console.log('verifyAccessToken error : ', error); // If not, throw error

    throw new _apolloServerExpress.AuthenticationError('user.invalidCredentials');
  }
};

exports.verifyAccessToken = verifyAccessToken;
//# sourceMappingURL=accessToken.js.map