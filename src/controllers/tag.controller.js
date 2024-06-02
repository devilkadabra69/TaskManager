import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.util.js";
import apiError from "../utils/apiError.util.js";
import apiResponse from "../utils/apiResponse.util.js";
import { Tag } from "../models/tag.models.js";

const getAllTags = asyncHandler(async (req, res) => {
    const user = req.user;
    const uid = user?._id;

    if (!(user || uid)) return new apiError(401, "user is invalid or uid not found line 11 tag.controller.js");

    const tags = await Tag.findById(uid);

    if (!tags) return new apiError(404, "no tags found");

    res.status(200).json(new apiResponse(200, tags));
});

const getTagsBasedOnName = asyncHandler(async (req, res) => {
    const user = req.user;
    const uid = user?._id;

    if (!(user || uid)) return new apiError(401, "user is invalid or uid not found line 24 tag.controller.js");

    const name = req.body.name;

    if (!name) return new apiError(400, "name is required line 28 tag.controller.js");

    const tags = await Tag.find({
        $and: {
            userId: mongoose.Schema.Types.ObjectId(uid),
            name: name
        }
    });

    if (!tags) return new apiError(404, "no tags found line 37 tag.controller.js");

    return res.status(200).json(new apiResponse(200, tags));
})