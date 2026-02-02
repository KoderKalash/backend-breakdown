import jwt from "jsonwebtoken"
import User from "../models/user.models.js";

const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer")) return res.status(400).json({ message: "Bad request" });

        const token = header.split(" ")[1];
        if (!token) return res.status(400).json({ message: "Bad request" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user
        next()
    }catch(error){
        console.log("error\n",error);
        return res.status(500).json({message: "Something went wrong.."});
    }
}

export default protect