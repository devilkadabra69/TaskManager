import mongoose from "mongoose";
import apiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js"
import apiResponse from "../utils/apiResponse.util.js";
import { TimeTable } from "../models/timeTable.models.js"

const getAllTimeTable = asyncHandler(async (req, res) => {
    const user = req.user;
    const uid = user?._id;

    if (!(user || uid)) return new apiError(404, "user or uid not found from line 11 timetable.controller.js");

    const timeTables = await TimeTable.findById(uid);

    if (!timeTables) return new apiResponse(404, "TimeTable not found/or set please set first");

    return res.status(200).json(new apiResponse(200, timeTables));
});
