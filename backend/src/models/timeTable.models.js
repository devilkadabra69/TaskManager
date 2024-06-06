import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        default: ""
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventStartTime: {
        type: String,
        required: true
    },
    eventEndTime: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags"
    }],
    label: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "labels"
    }
}, { timestamps: true })

export const TimeTable = mongoose.model("TimeTable", timeTableSchema)//timetable collection