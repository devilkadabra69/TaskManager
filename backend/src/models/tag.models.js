import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
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