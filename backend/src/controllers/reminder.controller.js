import mongoose from "mongoose";
import { Reminder } from "../models/reminder.models.js";
import asyncHandler from "../utils/asyncHandler.util.js"
import apiError from "../utils/apiError.util.js";
import apiResponse from "../utils/apiResponse.util.js"


const getAllReminders = asyncHandler(async (req, res) => {
    const user = req.user;
    const uid = user?._id;

    if (!(uid || user)) return new apiError(401, "user or user id not found line 12 from reminder.controller.js");

    const reminders = await Reminder.findById(uid);

    if (!reminders) return new apiError(404, "no reminders were found please set first line 16 reminder.controllers.js");

    return res.status(200).json(new apiResponse(200, reminders));
})

export {
    getAllReminders
}