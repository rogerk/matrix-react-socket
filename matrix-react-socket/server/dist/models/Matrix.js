"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var matrixSchema = new _mongoose["default"].Schema({
  rows: {
    type: Number,
    required: true,
    "default": 8
  },
  cols: {
    type: Number,
    required: true,
    "default": 8
  },
  matrix: [{
    _id: {
      type: String,
      required: true
    },
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    },
    color: {
      type: String,
      "default": "#FFFFFF"
    }
  }]
});

var MatrixModel = _mongoose["default"].model("Matrix", matrixSchema);

var _default = MatrixModel;
exports["default"] = _default;