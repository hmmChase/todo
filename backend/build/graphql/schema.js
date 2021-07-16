"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTools = require("graphql-tools");

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

// https://www.graphql-tools.com/docs/generate-schema/#makeexecutableschemaoptions
var development = process.env.NODE_ENV === 'development';
var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"] // logger: development && { log: e => console.log(e) },
  // allowUndefinedInResolve: !development

});
var _default = schema;
exports["default"] = _default;
//# sourceMappingURL=schema.js.map