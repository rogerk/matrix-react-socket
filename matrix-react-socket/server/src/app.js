import express from "express";
import socketIo from "socket.io";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import {
    INITIAL_MATRIX,
    UPDATE_PIXEL_COLOR,
    RESET_MATRIX_COLOR
} from "./constants/event-types.js";

dotenv.config();
const port = process.env.PORT || 4001;
const jsonDB = process.env.JSON_DB_FILE;
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;

const app = express();
const http = require("http").Server(app);

app.use(express.json);

const io = socketIo(http, 
    { cors: { origin: "http://localhost:3000",  credentials: true}});

io.on("connection", socket => {
    console.log("Client Connected");

    socket.on(INITIAL_MATRIX, () => {
        getMatrix(socket);
    });

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });

    socket.on(UPDATE_PIXEL_COLOR, data => {
        const pixel = data.pixel;
        pixel.color = data.color;
        updatePixel(socket, pixel);
    });

    socket.on(RESET_MATRIX_COLOR, data => {
        const color = data.color;
        resetMatrix(socket, color);
    });
});

const getMatrix = async socket => {
    try {
        const res = await getMatrixData();
        socket.emit(INITIAL_MATRIX, res.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        socket.emit("server_error", "Could not get matrix data", `${error}`);
    }
};

const updatePixel = async (socket, event) => {
    try {
        const res = await axios.put(
            `http://${dbHost}:${dbPort}/matrix/${event.id}`,
            event
        );
        io.sockets.emit(UPDATE_PIXEL_COLOR, res.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        socket.emit("server_error", "Could not update matrix pixel color");
    }
};

const resetMatrix = async (socket, event) => {
    try {
        let res = await getMatrixData(socket);
        const data = res.data;
        data.map(element => {
            element.color = event;
        });
        fs.writeFileSync(jsonDB, JSON.stringify({ matrix: data }, null, "\t"));
        io.sockets.emit(RESET_MATRIX_COLOR, data);
    } catch (error) {
        console.error(`Error: ${error}`);
        socket.emit(
            "server_error",
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