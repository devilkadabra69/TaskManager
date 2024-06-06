import apiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token is :: ", token);

        if (!token) {
            return next(new apiError(401, "Unauthorized request: No token provided"));
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return next(new apiError(401, `Unauthorized request: ${err.message}`));
        }

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return next(new apiError(401, "Unauthorized request: Invalid token"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(new apiError(401, error?.message || "Unauthorized request: Invalid token"));
    }
});
