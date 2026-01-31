//Authentication

import User from "../models/user.models.js";
import bcrypt, { hash } from "bcrypt"
import { signJwtToken } from "../utils/jwt.js";

// const saltRounds = 10;

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Bad Request" });
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") return res.status(400).json({ message: "Bad Request" });
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") return res.status(400).json({ message: "Bad Request" });

        // const salt = await bcrypt.genSalt(saltRounds);
        // const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({ name, email, password });

        res.status(201).json({
            status: "success",
            data: { name, email }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failure",
        })

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Bad Request" });
        if (typeof email !== "string" || typeof password !== "string") return res.status(400).json({ message: "Bad Request" });
        if (email.trim() === "" || password.trim() === "") return res.status(400).json({ message: "Bad Request" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const flag = await bcrypt.compare(password, user.password);

        if (!flag) return res.status(401).json({ message: "Unauthorized: Wrong Password" });

        const token = signJwtToken(user._id);

        res.status(200).json({
            status: "success",
            token: token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failure"
        })
    }
}