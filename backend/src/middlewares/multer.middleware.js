import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        const filename = file.filename + "_" + Date.now() + "_" + path.extname(file.originalname);
        cb(null, `${filename}`);
    }
})

export default multer({ storage: storage });