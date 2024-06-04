import { User } from "../models/user.models.js"
import { uploadToCloudinary } from "../utils/cloudinary.util.js"
import apiResponse from "../utils/apiResponse.util.js"
import apiError from "../utils/apiError.util.js"
import { COOKIE_OPTIONS } from "../../constants.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return new apiError(401, "Invalid Credentials from line 9 user.controller.js");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    user.save({
        validateBeforeSave: false
    });

    return {
        accessToken,
        refreshToken
    }
}
const login = asyncHandler(async (req, res) => {

    try {
        // logic to write login
        const { email, password, userName } = req.body;
        if (!(email || userName)) {
            return new apiError(401, "Please provide email or username");
        }

        if (!password) {
            return new apiError(401, "Please provide password");
        }

        const user = await User.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            return new apiError(401, "Invalid Credentials");
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return new apiError(401, "Invalid Password\n");
        }

        const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(user?._id);

        const loggedInUser = await User.findById(user?._id).select("-password -refreshToken");

        return res
            .status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json(new apiResponse(200, "User Logged In Successfully", {
                loggedInUser,
                accessToken,
                refreshToken
            }));
    } catch (error) {
        return new apiError(500, "Internal Server Error");
    }
});
const logout = asyncHandler(async (req, res) => {
    const user = req?.user;
    if (!user) {
        return new apiError(401, "User not found Line number 71 user.controller.js");
    }
    const id = user._id;
    await User.findByIdAndUpdate(id, { $set: { refreshToken: "" } }, { new: true });
    return res.status(200).clearCookie("accessToken", "", COOKIE_OPTIONS).clearCookie("refreshToken", "", COOKIE_OPTIONS)
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

