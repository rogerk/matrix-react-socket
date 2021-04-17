import models, { connectDb } from "./index";
import "dotenv/config";
import MatrixModel from "./Matrix";

try {
    connectDb().then(async () => {
        console.log("Connected to:" + process.env.DATABASE_URL);
    });
} catch (error) {
    console.error(`Error: ${error}`);
}

const rows = process.env.MATRIX_ROWS;
const cols = process.env.MATRIX_COLS;
const color = process.env.MATRIX_PIXEL_COLOR;

const pixels = [];

let idx = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
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
    MatrixModel.deleteMany({}).then(async () => {
        console.log("matrix entries removed!");
        const matrixArray = await MatrixModel.find({}).exec();
        console.log(matrixArray);
    });

    const matrix = new MatrixModel({
        rows: rows,
        cols: cols,
        matrix: pixels
    });

    matrix.save().then(async () => {
        console.log("matrix initialized!");
        const matrixArray = await MatrixModel.find({}).exec();
        console.log(JSON.stringify(matrixArray));
    });
} catch (error) {
    console.error(`matrix initiaization error: ${error}`);
}

export default models;