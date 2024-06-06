import Router from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
import { login, logout, registerUser } from "../controllers/user.controller.js";
const router = Router();

router.route("/login").post(
    login
)
router.route("/register").post(
    upload.fields(
        [
            {
                name:"profilePicture",
                maxCount:1
            },{
                name:"coverPicture",
                maxCount:1
            }
        ]
    ),
    registerUser
)
router.route("/logout").post(
    verifyJwt,
    logout
);



export { router }