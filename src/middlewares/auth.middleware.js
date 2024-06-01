import ApiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        // logic to write verify jwt
    } catch (error) {
        return new ApiError(401, "Unauthorized :: Line 9 auth.middleware.js")
    }
})

