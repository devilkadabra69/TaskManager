import { Todo } from "../models/todo.models.js"
import mongoose from "mongoose";
import apiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js"
import apiResponse from "../utils/apiResponse.util.js";

const getAllTodos = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new apiError(404, "User not found line 10 todo.controller.js");
    }
    const uid = user._id;

    const todos = await Todo.aggregate([
        {
            $match: {
                userId: mongoose.Types.ObjectId(uid)
            }
        }
    ]);

    return res.status(200).json(new apiResponse(200, todos));
});


const getTodosBasedOnCompleteBy = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new apiError(404, "User not found line 29 todo.controller.js");
    }
    const uid = user._id;
    const { completeBy } = req.body;

    if (!completeBy) throw new apiError(401, "CompleteBy is required and is not found line 34 todo.controller.js");

    const todos = await Todo.find({
        userId: mongoose.Types.ObjectId(uid),
        completeBy: new Date(completeBy)
    });

    if (!todos.length) throw new apiError(404, "Todos not found line 41 todo.controller.js");

    return res.status(200).json(new apiResponse(200, todos));
});


const getTodosBasedOnStatus = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new apiError(404, "User not found line 50 todo.controller.js");
    }
    const uid = user._id;
    const { status } = req.body;

    if (!status) throw new apiError(401, "Status is required and is not found line 55 todo.controller.js");

    if (!["todo", "in-progress", "done"].includes(status)) throw new apiError(401, "Status is invalid line 57 todo.controller.js");

    const todos = await Todo.find({
        userId: mongoose.Types.ObjectId(uid),
        status: status
    });

    return res.status(200).json(new apiResponse(200, todos));
});

const getTodosBasedOnTags = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new apiError(404, "User not found line 66 todo.controller.js");
    }
    const uid = user._id;
    const { tags } = req.body;

    if (!(uid || tags)) return new apiError(401, "Tag oor uid is required and is not found line 75 todo.controller.js got", uid, "\n", tags);

    const todos = await Todo.find({
        userId: mongoose.Types.ObjectId(uid),
        tags: tags
    })

    if (!todos) return new apiError(404, "Todos not found line 82 todo.controller.js");

    return res.status(200).json(new apiResponse(200, todos));
})