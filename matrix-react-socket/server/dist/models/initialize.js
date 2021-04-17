"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireWildcard(require("./index"));

require("dotenv/config");

var _Matrix = _interopRequireDefault(require("./Matrix"));

try {
  (0, _index.connectDb)().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Connected to:" + process.env.DATABASE_URL);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
} catch (error) {
  console.error("Error: ".concat(error));
}

var rows = process.env.MATRIX_ROWS;
var cols = process.env.MATRIX_COLS;
var color = process.env.MATRIX_PIXEL_COLOR;
var pixels = [];
var idx = 0;

for (var i = 0; i < rows; i++) {
  for (var j = 0; j < cols; j++) {
    pixels[idx] = {
      _id: i.toString() + j.toString(),
      x: i,
      y: j,
      color: color
    };
    idx++;
  }
}

try {
  _Matrix["default"].deleteMany({}).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var matrixArray;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("matrix entries removed!");
            _context2.next = 3;
            return _Matrix["default"].find({}).exec();

          case 3:
            matrixArray = _context2.sent;
            console.log(matrixArray);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));

  var matrix = new _Matrix["default"]({
    rows: rows,
    cols: cols,
    matrix: pixels
  });
  matrix.save().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var matrixArray;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("matrix initialized!");
            _context3.next = 3;
            return _Matrix["default"].find({}).exec();

          case 3:
            matrixArray = _context3.sent;
            console.log(JSON.stringify(matrixArray));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
} catch (error) {
  console.error("matrix initiaization error: ".concat(error));
}

var _default = _index["default"];
exports["default"] = _default;