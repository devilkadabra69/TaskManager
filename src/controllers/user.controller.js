import { User } from "../models/user.models.js"
import { uploadToCloudinary } from "../utils/cloudinary.util.js"
import apiResponse from "../utils/apiResponse.util.js"
import apiError from "../utils/apiError.util.js"
import { COOKIE_OPTIONS } from "../../constants.js"
import asyncHandler from "../utils/asyncHandler.util.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new apiError(401, "Invalid Credentials from line 9 user.controller.js");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating refresh and access Token from line 28 :: user.controller.js");
    }
};
const login = asyncHandler(async (req, res, next) => {
    console.log("login controller initiated!!!");
    const { email, password, userName } = req.body;
    console.log("req.body :: \n", req.body);

    if (!email && !userName) {
        return next(new apiError(401, "Please provide email or username"));
    }

    if (!password) {
        return next(new apiError(401, "Please provide password"));
    }

    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
        return next(new apiError(401, "Invalid Credentials"));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return next(new apiError(401, "Invalid Password"));
    }

    try {
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res
            .status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json(new apiResponse(200, "User Logged In Successfully", {
                loggedInUser,
                accessToken,
                refreshToken,
            }));
    } catch (error) {
        next(error);
    }
});

const logout = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        return new apiError(401, "User not found Line number 71 user.controller.js");
    }
    const id = user._id;
    await User.findByIdAndUpdate(id, req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        });
    return res.status(200).clearCookie("accessToken",COOKIE_OPTIONS).clearCookie("refreshToken",COOKIE_OPTIONS)
        .json(new apiResponse(200, "User Logged Out Successfully", {}));
});
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, fullName } = req.body;

    if ([userName, email, password, fullName].some(e => e === undefined)) {
        return new apiError(400, "Please provide all the fields");
    }

    //check for duplicate user
    const user = await User.findOne({ $or: [{ email }, { userName }] });

    let profilePicture = "";
    let coverPicture = "";

    if (req.files && (req.files.profilePicture || req.files.coverPicture)) {
        if (req.files.profilePicture) {
            const avatarLocalPath = req.files.avatar[0].path;
            profilePicture = await uploadToCloudinary(avatarLocalPath);
        }

        if (req.files.coverPicture) {
            const coverImageLocalPath = req.files.coverPicture[0].path;
            coverPicture = await uploadToCloudinary(coverImageLocalPath);
        }
    } else {
        console.log(req.files, "its undefined");
    }

    if (user) {
        return new apiError(401, "User already exists");
    }

    const newUser = await User.create({
        userName: userName,
        email: email,
        password: password,
        fullName: fullName,
        profilePicture: profilePicture?.url || "",
        coverPicture: coverPicture?.url || ""
    })

    return res.status(201).json(new apiResponse(201, newUser, "User created Successfully"));
});

export {
    login,
    generateAccessTokenAndRefreshToken,
    logout,
    registerUser   
}

