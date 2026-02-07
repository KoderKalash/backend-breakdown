import connectDB from "./config/db.js"
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        })
    }catch(error){
        console.log("Something went wrong...",error)
    }

}

startServer()