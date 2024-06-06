import mongoose from "mongoose";
import { config } from 'dotenv';
config({
    path: './.env'
})
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        if (connection) {
            console.log("Database connected successfully :: DB_HOST :: \n", connection.connection.host);
        } else {
            console.log("Database connection failed");
            process.exit(1);
        }
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
export default connectDb;