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

const login = asyncHandler(async (req, res, next) => {
    try {
        // logic to write login
        const { email, password, userName } = req.body;
        if (!(email || userName)) {
            return new ApiError(401, "Please provide email or username");
        }

        if (!password) {
            return new ApiError(401, "Please provide password");
        }

        const user = await User.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            return new ApiError(401, "Invalid Credentials");
        }


    } catch (error) {
        return new ApiError(501, `Unauthorized or Something went wrong :: Line 33 auth.middleware.js ::\n ${error?.message}`, error);
    }
})