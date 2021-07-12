"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    // Return idea matching ID
    idea: function idea(parent, args, ctx, info) {
      return ctx.prisma.idea.findUnique({
        where: {
          id: args.id
        }
      });
    },
    // Return all ideas
    ideas: function ideas(parent, args, ctx, info) {
      return ctx.prisma.idea.findMany();
    }
  } // Mutation: {}

};
exports["default"] = _default;
//# sourceMappingURL=ideaResolver.js.map