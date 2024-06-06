import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        content: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo",
            index: true,
        },
        completeBy: {
            type: Date,
            required: true,
        },
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "tags"
        }]
    },
    {
        timestamps: true, // createdAt, updatedAt
        toJSON: { virtuals: true } // Enable virtual properties in toJSON output
    }
);

// Define a virtual property for the color based on the status
todoSchema.virtual('statusColor').get(function () {
    switch (this.status) {
        case 'todo':
            return 'orange'; // Set color to orange for todo status
        case 'in-progress':
            return 'red'; // Set color to red for in-progress status
        case 'done':
            return 'green'; // Set color to green for completed status
        default:
            return 'black'; // Default color
    }
});

export const Todo = mongoose.model("Todo", todoSchema);
