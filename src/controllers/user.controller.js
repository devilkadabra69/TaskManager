import { User } from "../models/user.models.js"
const login = asyncHandler(async (req, res) => {
    /*
    Login logic or algorithm
    take input username/email and password
    check validity of username/email
    if username/email is valid then check for password
    if password is valid then search for the user and return the user
    */
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

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return new ApiError(401, "Invalid Password\n");
        }


        // FIXME: left to code



    } catch (error) {
        return new ApiError(501, `Unauthorized or Something went wrong :: Line 33 auth.middleware.js ::\n ${error?.message}`, error);
    }
})

const logout = asyncHandler(async (req, res) => {

});

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, fullName } = req.body

    // if([userName,email,password,fullName].some(e=>e===undefined)){
    //     return new ApiError(401, "Please provide all the fields");
    // }

    // logic to rite register
    // check for duplicate user
    // TODO: work in controller login registerUser

    //check for any field empty

    if ([userName, email, password, fullName].some(e => e === undefined)) {
        return new ApiError(401, "Please provide all the fields");
    }

    //check for duplicate user
    const user = await User.findOne({ $or: [{ email }, { userName }] });

    if (user) {
        return new ApiError(401, "User already exists");
    }

    const newUser = await User.create({
        // TODO:
    })



    // const user = await User.findOne({ $or: [{ email }, { userName }] });
    // if (user) {
    //     return new ApiError(401, "User already exists");
    // }

    // const newUser = await User.create({
    //     userName,
    //     email,
    //     password,
    //     fullName
    // })
})