import connectDb from "./src/db/index.db.js";
import { app, port } from "./app.js"

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log("process is exiting with code 1 \n error message From line 12 ./index.js ::\n", error?.message);
        process.exit(1);
    })
