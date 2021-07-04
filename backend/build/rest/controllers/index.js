"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var index = function index(req, res, next) {
  return res.status(200).json({
    route: 'index'
  });
};

exports.index = index;
//# sourceMappingURL=index.js.map