import apiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const incomingAccessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        const incomingAccessToken_2 = req.header('authorization')?.replace('Bearer ', '') || req.cookies?.accessToken;
        console.log("incoming access token with authorization ", incomingAccessToken_2);
        console.log("incoming access token with Authorization ", incomingAccessToken);
        if (!(incomingAccessToken || incomingAccessToken_2)) return new apiError('Unauthorized ACCESS TOKEN :: LINE 12 FROM auth.middleware.js\n', 401)
        const decodedToken = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) return new apiError('Unauthorized ACCESS TOKEN :: LINE 15 FROM auth.middleware.js\n', 401);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        //TODO: Will discuss later
        if (!user) return new apiError('User not found with the given the given access token || INVALID ACCESS TOKEN  :: LINE 20 FROM auth.middleware.js\n', 401);
        req.user = user;
        next();
    } catch (error) {
        console.error(error?.message);
        return new apiError('Unauthorized ACCESS TOKEN :: LINE 25 FROM auth.middleware.js\n', 401)
    }
})

