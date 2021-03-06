import express from "express";
import socketIo from "socket.io";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import {
    ALL_MATRIX,
    INITIAL_MATRIX,
    UPDATE_PIXEL_COLOR,
    PIXEL_COLOR_UPDATE,
    RESET_MATRIX_COLOR,
    MATRIX_COLOR_RESET,
    SERVER_ERROR
} from "./constants/event-types.js";

dotenv.config();
const port = process.env.PORT || 4001;
const jsonDB = process.env.JSON_DB_FILE;
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;

const app = express();
const http = require("http").Server(app);

app.use(express.json);

const io = socketIo(http, {
    cors: { origin: "http://localhost:8080", credentials: true },
});

io.on("connection", (socket) => {
    console.log("Client Connected");

    socket.on(INITIAL_MATRIX, () => {
        getMatrix(socket);
    });

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });

    socket.on(UPDATE_PIXEL_COLOR, (data) => {
        const pixel = data.pixel;
        pixel.pixel.color = data.color;
        updatePixel(socket, pixel);
    });

    socket.on(RESET_MATRIX_COLOR, (data) => {
        const color = data.color;
        resetMatrix(socket, color);
    });
});

const getMatrix = async (socket) => {
    try {
        const res = await getMatrixData();
        socket.emit(ALL_MATRIX, res.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        socket.emit(SERVER_ERROR, "Could not get matrix data", `${error}`);
    }
};

const updatePixel = async (socket, event) => {
    try {
        const res = await axios.put(
            `http://${dbHost}:${dbPort}/matrix/${event.pixel.id}`,
            event.pixel
        );
        io.sockets.emit(PIXEL_COLOR_UPDATE, res.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        socket.emit(SERVER_ERROR, "Could not update matrix pixel color");
    }
};

const resetMatrix = async (socket, event) => {
    try {
        let res = await getMatrixData(socket);
        const data = res.data;
        data.map((element) => {
            element.color = event;
        });
        fs.writeFileSync(jsonDB, JSON.stringify({ matrix: data }, null, "\t"));
        io.sockets.emit(MATRIX_COLOR_RESET, data);
    } catch (error) {
        console.error(`Error: ${error}`);
        socket.emit(
            SERVER_ERROR,
            "Could not update all matrix pixel colors to the specified color"
        );
    }
};

const getMatrixData = () => {
    let res = axios.get(`http://${dbHost}:${dbPort}/matrix`);
    return res;
};

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
