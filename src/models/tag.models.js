import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    color: {
        type: String,
        default: "#4F4F4F"
    }
}, { timestamps: true });

export const Tag = mongoose.model("Tag", tagSchema);