import mongoose from "mongoose";
import apiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js"
import apiResponse from "../utils/apiResponse.util.js";
import { Label } from "../models/label.models.js";

const getAllLabels = asyncHandler(async (req, res) => {
    const user = req.user;
    const uid = user?._id;

    if (!(user || uid)) return new apiError(401, "uid or user not valid check the parameters passed from line 11 in label.controller.js");

    const labels = await Label.findById(uid);

    if (!labels) return new apiError(404, "labels not found from line 15 in label.controller.js");

    return res.status(200).json(new apiResponse(200, labels));
})

export {
    getAllLabels
}