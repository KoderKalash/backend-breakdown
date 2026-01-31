import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await dbConnect()
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    })
}

startServer()