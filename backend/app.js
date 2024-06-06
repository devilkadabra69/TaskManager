import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT_16KB } from "./constants.js";
import userRoute from "./src/routes/user.routes.js"

const port = process.env.PORT || 8000;
console.log("Port Free :: ", port);

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser({
    signed: true,
    secure: true,
}));
app.use(urlencoded({
    extended: true,
    limit: LIMIT_16KB
}))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Routes
app.use("/api/v1/users", userRoute);

app.get("/",(req,res)=>{
    res.send("Hello world");
})

export { app, port };
