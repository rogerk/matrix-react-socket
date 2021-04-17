"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

var _eventTypes = require("./constants/event-types.js");

_dotenv["default"].config();

var port = process.env.PORT || 4001;
var jsonDB = process.env.JSON_DB_FILE;
var dbPort = process.env.DB_PORT;
var dbHost = process.env.DB_HOST;
var app = (0, _express["default"])();

var http = require("http").Server(app);

app.use(_express["default"].json);
var io = (0, _socket["default"])(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});
io.on("connection", function (socket) {
  console.log("Client Connected");
  socket.on(_eventTypes.INITIAL_MATRIX, function () {
    getMatrix(socket);
  });
  socket.on("disconnect", function () {
    console.log("Client Disconnected");
  });
  socket.on(_eventTypes.UPDATE_PIXEL_COLOR, function (data) {
    var pixel = data.pixel;
    pixel.color = data.color;
    updatePixel(socket, pixel);
  });
  socket.on(_eventTypes.RESET_MATRIX_COLOR, function (data) {
    var color = data.color;
    resetMatrix(socket, color);
  });
});

var getMatrix = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(socket) {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getMatrixData();

          case 3:
            res = _context.sent;
            socket.emit(_eventTypes.INITIAL_MATRIX, res.data);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error("Error: ".concat(_context.t0));
            socket.emit("server_error", "Could not get matrix data", "".concat(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getMatrix(_x) {
    return _ref.apply(this, arguments);
  };
}();

var updatePixel = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(socket, event) {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios["default"].put("http://".concat(dbHost, ":").concat(dbPort, "/matrix/").concat(event.id), event);

          case 3:
            res = _context2.sent;
            io.sockets.emit(_eventTypes.UPDATE_PIXEL_COLOR, res.data);
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error("Error: ".concat(_context2.t0));
            socket.emit("server_error", "Could not update matrix pixel color");

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function updatePixel(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var resetMatrix = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(socket, event) {
    var res, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return getMatrixData(socket);

          case 3:
            res = _context3.sent;
            data = res.data;
            data.map(function (element) {
              element.color = event;
            });

            _fs["default"].writeFileSync(jsonDB, JSON.stringify({
              matrix: data
            }, null, "\t"));

            io.sockets.emit(_eventTypes.RESET_MATRIX_COLOR, data);
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.error("Error: ".concat(_context3.t0));
            socket.emit("server_error", "Could not update all matrix pixel colors to the specified color");

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function resetMatrix(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getMatrixData = function getMatrixData() {
  var res = _axios["default"].get("http://".concat(dbHost, ":").concat(dbPort, "/matrix"));

  return res;
};

http.listen(port, function () {
  console.log("Listening on port ".concat(port));
});