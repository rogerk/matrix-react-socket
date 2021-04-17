import mongoose from "mongoose";
const matrixSchema = new mongoose.Schema({
    rows: {
        type: Number,
        required: true,
        default: 8
    },
    cols: {
        type: Number,
        required: true,
        default: 8
    },
    matrix: [
        {
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
                default: "#FFFFFF"
            }
        }
    ]
});

const MatrixModel = mongoose.model("Matrix", matrixSchema);
export default MatrixModel;