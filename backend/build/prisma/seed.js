"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('@prisma/client'),
    PrismaClient = _require.PrismaClient; // 'npm run seed' to seed


var prisma = new PrismaClient();

var main = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var createdName;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Start seeding ...");
            _context.next = 3;
            return prisma.name.create({
              data: {
                name: 'hmmStart'
              }
            });

          case 3:
            createdName = _context.sent;
            console.log('Created name: ', createdName);
            console.log("Seeding finished.");

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main()["catch"](function (e) {
  console.error(e);
  process.exit(1);
})["finally"]( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Seeding complete.');
          _context2.next = 3;
          return prisma.$disconnect();

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=seed.js.map