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
});
const createTodo = asyncHandler(async (req,res) =>{
    const user = req.user;
    const id = user._id;
    if (!user) {
        throw new apiError(404, "User not found line 66 todo.controller.js");
    }
    
    const {title,content,status,completeBy,tags} = req.body;
    if(!title) return new apiError(401,"Titile is missing , Its required !!!");

    if(!content) console.log("Content was empty ");

    if(!completeBy) return new apiError(401,"Time is required !!!");

    const validStatuses = ["todo", "in-progress", "done"];
    if (status && !validStatuses.includes(status)) {
        return next(new apiError(401, `Invalid status. Valid statuses are: ${validStatuses.join(", ")}`));
    }

    let tagsArray=[];
    if(tags){
        if(Array.isArray(tags)){
            tagsArray=tags;
        }else if(typeof tags ==='string'){
            tagsArray = [tags];
        }else{
            return new apiError(401,"Tags should be a tag ID or an array of tag IDs");
        }

        if (!tagsArray.every(tag => mongoose.Types.ObjectId.isValid(tag))) {
            return next(new apiError(400, "One or more tags are not valid IDs"));
        }
    }

    try {
        const newTodo = new Todo({
            userId: req.user._id, // Assuming you have a user authentication middleware that sets req.user
            title,
            content,
            status,
            completeBy,
            tags: tagsArray
        });

        const savedTodo = await newTodo.save();
        
        res.status(200)
        .json(new apiResponse(200,savedTodo,"Todo Item Created Successfully"));
    } catch (error) {
        return new apiError(500,"An error occured when creating a new todo",error);
    }


});
const deleteTodo = asyncHandler(async (req, res, next) => {
    const { todoId } = req.params;

    const user = req.user;
    const id = user._id;

    if(!id) return new apiError(401, "user id is not present !!! Error Occured");

    if (!todoId) {
        return new apiError(400, "Todo ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return new apiError(400, "Invalid Todo ID");
    }

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return next(new apiError(404, "Todo item not found"));
        }
        // Ensure the Todo item belongs to the authenticated user
        if (todo.userId.toString() !== req.user._id.toString()) {
            return new apiError(403, "You do not have permission to delete this Todo item");
        }

        await Todo.findByIdAndDelete(todoId);

        res
        .status(200)
        .json(new apiResponse(200,{},"Todo Item Deleted Successfully"));

    }catch(error){
        return new apiError(500,"Error while Deleting the todo , Sorry");
    }
 });

export {
    getAllTodos,
    getTodosBasedOnCompleteBy,
    getTodosBasedOnStatus,
    getTodosBasedOnTags,
    createTodo,
    deleteTodo
}