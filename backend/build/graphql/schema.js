"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Query {\n    user(id: ID!): User\n    users: [User!]!\n    currentUser: User\n\n    idea(id: ID!): Idea\n    ideas: [Idea!]!\n  }\n\n  type Mutation {\n    logIn(email: String!, password: String!): LoginResponse!\n  }\n\n  enum Role {\n    USER\n    ADMIN\n  }\n\n  type User {\n    id: ID!\n    createdAt: Float!\n    updatedAt: Float!\n    deletedAt: Float!\n    email: String!\n    password: String!\n    role: String!\n    ideas: [Idea!]\n  }\n\n  type Idea {\n    id: ID!\n    content: String!\n    author: User!\n  }\n\n  type LoginResponse {\n    user: User\n  }\n"])));
var _default = typeDefs;
exports["default"] = _default;
//# sourceMappingURL=schema.js.map