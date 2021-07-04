"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var resolvers = {
  Query: {
    name: function () {
      var _name = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, ctx, info) {
        var name;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return ctx.prisma.name.findMany();

              case 2:
                name = _context.sent;
                return _context.abrupt("return", {
                  id: name[0].id,
                  name: name[0].name
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function name(_x, _x2, _x3, _x4) {
        return _name.apply(this, arguments);
      }

      return name;
    }()
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=name.js.map