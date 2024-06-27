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
    return res.status(200).clearCookie("accessToken", COOKIE_OPTIONS).clearCookie("refreshToken", COOKIE_OPTIONS)
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
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new apiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new apiResponse(200, {}, "Password changed successfully"))
});
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { userName, email, fullName } = req.body;

    if (!userName) return new apiError(401, "userName is required !! please provide sir");
    if (!email) return new apiError(401, "email is required !!");
    if (!fullName) return new apiError(401, "fullName is required sir!!!");

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullName,
            email,
            userName
        }
    }, {
        new: true
    }).select("-password -refreshToken");


    return res.status(201)
        .json(new apiResponse(201, user, "Account Details Updated Successfully !!!"));
});
const updateUserProfilePicture = asyncHandler(async (req, res) => {
    const profile_local_path = req.files?.path;

    if (!profile_local_path) return new apiError(404, "We don't found any file :: ProfileImage");

    const user = req.user;
    const id = user._id;

    if (!user) return new apiError(401, "user not found in the db");

    const profile_picture_cloudinary_url = await uploadToCloudinary(profile_local_path);

    await User.findByIdAndUpdate(id, {
        $set: {
            profilePicture: profile_picture_cloudinary_url.url
        }
    }, {
        new: true
    }).select("-password refreshToken");

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Profile Picture updated")
        )
});
const updateUserCoverPicture = asyncHandler(async (req, res) => {
    const cover_local_path = req.files?.path;

    if (!cover_local_path) return new apiError(404, "we don't found any file :: CoverImage");

    const user = req.user;
    const id = user._id;

    if (!user) return new apiError(401, "user not found in the db");

    const cover_picture_cloudinary_url = await uploadToCloudinary(cover_local_path);

    await User.findByIdAndUpdate(id, {
        $set: {
            coverPicture: cover_picture_cloudinary_url.url
        }
    }, {
        new: true
    }).select("-password refreshToken");

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Cover Picture updated")
        )
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new apiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new apiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Refresh token is expired or used")

        }


        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
            .json(
                new apiError(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid refresh token")
    }

});
export {
    login,
    generateAccessTokenAndRefreshToken,
    logout,
    registerUser,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserProfilePicture,
    updateUserCoverPicture,
    refreshAccessToken
}

