"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    // Return user matching ID
    user: function user(parent, args, ctx, info) {
      return ctx.prisma.user.findOne({
        where: {
          id: args.id
        }
      });
    },
    // Return all users
    users: function users(parent, args, ctx, info) {
      return ctx.prisma.user.findMany();
    }
  } // Mutation: {}

};
exports["default"] = _default;
//# sourceMappingURL=userResolver.js.map