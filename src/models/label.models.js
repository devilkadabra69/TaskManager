import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "#4F4F4F"
    }
})

export const Label = mongoose.model("Label", labelSchema)  