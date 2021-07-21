"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _schema = require("@graphql-tools/schema");

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

// https://www.graphql-tools.com/docs/generate-schema/#makeexecutableschemaoptions
var development = process.env.NODE_ENV === 'development';
var schema = (0, _schema.makeExecutableSchema)({
  // Type definitions define the "shape" of your data and specify
  // which ways the data can be fetched from the GraphQL server.
  typeDefs: _typeDefs["default"],
  // Resolvers define the technique for fetching the types in the schema.
  resolvers: _resolvers["default"] // logger: development && { log: e => console.log(e) },
  // allowUndefinedInResolve: !development

});
var _default = schema;
exports["default"] = _default;
//# sourceMappingURL=schema.js.map