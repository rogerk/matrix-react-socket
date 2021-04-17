"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Matrix = _interopRequireDefault(require("./Matrix"));

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL);
};

exports.connectDb = connectDb;
var models = {
  Matrix: _Matrix["default"]
};
var _default = models;
exports["default"] = _default;