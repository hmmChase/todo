"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var userClientCleaner = function userClientCleaner(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role
  };
};

var _default = userClientCleaner;
exports["default"] = _default;
//# sourceMappingURL=userClientCleaner.js.map