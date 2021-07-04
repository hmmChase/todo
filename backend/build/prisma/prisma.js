"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
var prisma;
var production = process.env.NODE_ENV === 'production';
if (production) prisma = new _client.PrismaClient();else {
  if (!global.prisma) global.prisma = new _client.PrismaClient();
  prisma = global.prisma;
}
var _default = prisma;
exports["default"] = _default;
//# sourceMappingURL=prisma.js.map