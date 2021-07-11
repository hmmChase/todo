"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('@prisma/client'),
    PrismaClient = _require.PrismaClient;

var bcrypt = require('bcryptjs'); // 'npm run seed' to seed


var prisma = new PrismaClient();

var ideas = function ideas() {
  var amtIdeas = 10;
  var ideas = [];

  for (var i = 1; i < amtIdeas; i++) {
    ideas.push({
      content: 'seeded idea ' + i
    });
  }

  return ideas;
};

var main = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user, admin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Start seeding...');
            _context.t0 = prisma.user;
            _context.next = 4;
            return bcrypt.hash('user123$', 10);

          case 4:
            _context.t1 = _context.sent;
            _context.t2 = {
              create: ideas()
            };
            _context.t3 = {
              email: 'user@email.com',
              password: _context.t1,
              role: 'USER',
              ideas: _context.t2
            };
            _context.t4 = {
              data: _context.t3
            };
            _context.next = 10;
            return _context.t0.create.call(_context.t0, _context.t4);

          case 10:
            user = _context.sent;
            console.log('Created user: ', user);
            _context.t5 = prisma.user;
            _context.next = 15;
            return bcrypt.hash('admin123$', 10);

          case 15:
            _context.t6 = _context.sent;
            _context.t7 = {
              email: 'admin@email.com',
              password: _context.t6,
              role: 'ADMIN'
            };
            _context.t8 = {
              data: _context.t7
            };
            _context.next = 20;
            return _context.t5.create.call(_context.t5, _context.t8);

          case 20:
            admin = _context.sent;
            console.log('Created admin: ', admin);

          case 22:
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

main()["catch"](function (error) {
  console.error(error);
  process.exit(1);
})["finally"]( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Seeding finished.');
          _context2.next = 3;
          return prisma.$disconnect();

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))); // const userData = [
//   {
//     email: 'admin@email.com',
//     password: async () => await bcrypt.hash('admin123$', 10),
//     role: 'ADMIN'
//   },
//   {
//     email: 'user@email.com',
//     password: async () => await bcrypt.hash('user123$', 10),
//     role: 'USER',
//     ideas: { create: ideas() }
//   }
// ];
// const main = async () => {
//   console.log('Start seeding...');
//   try {
//     for (const user of userData) {
//       const createdUser = await prisma.user.create({ data: user });
//       console.log('Created user: ', createdUser);
//     }
//     console.log('Seeding finished.');
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// };
//# sourceMappingURL=seed.js.map