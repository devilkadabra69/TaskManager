import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        default: ""
    },
    completeBy: {
        type: Date,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags"
    }],
    labels: {
        //label should be applied only one 
        type: mongoose.Schema.Types.ObjectId,
        ref: "labels"
    }
}, { timestamps: true })


export const Reminder = mongoose.model("Reminder", reminderSchema)
