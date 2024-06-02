import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configure your Cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (localFilePath) => {
    try {
        if (localFilePath) {
            const response = await cloudinary.uploader.upload(localFilePath, {
                folder: "TaskManager",
                resource_type: "auto",
                public_id: "profilePicture/" + Date.now(),
                use_filename: true,
                unique_filename: true,
            },
                (err, result) => {
                    if (err) console.log("Error on upload to local to cloudinary :: line 21 cloudinary.util.js :: \n", err);
                    if (result) console.log("Successfully uploaded to cloudinary :: line 22 cloudinary.util.js :: \n", result);
                }
            );
            console.log("Successfully uploaded to cloudinary :: line 25 cloudinary.util.js :: \n", response.url);
            fs.unlinkSync(localFilePath); // delete the local file after uploading to cloudinary
            return response; // we are returning response we can fetch the url anyways
        } else {
            console.log("localFilePath was null or something buggy in it");
            return null;
        }
    } catch (error) {
        // remove the localFile from the files in case of error occured
        fs.unlinkSync(localFilePath);
        console.error("Something went wrong while uploading image from local to cloudinary line 35 :: cloudinary.util.js :: \n", error.message);
        return null;
        // we are returning null so that we can check if the image is uploaded or not
    }
}