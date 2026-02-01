// CRUD operations come here
import Task from "../models/tasks.models.js"
import User from "../models/user.models.js";

export const createTask = async (req, res) => {
    try {
        const { title, isAssignedTo } = req.body
        if (!title || !isAssignedTo) return res.status(400).json({ message: "Bad request" });
        if (typeof title !== "string" || typeof isAssignedTo !== "number") return res.status(400).json({ message: "Bad request" });
        if (title.trim() === "" || isAssignedTo.trim() === "") return res.status(400).json({ message: "Bad request" });

        if (req.user.role === "employee") return res.status(403).json({ message: "User not Authorized" });

        const assignee = await User.findById(isAssignedTo);
        if (!assignee) return res.status(404).json({ message: "User not found" });

        const task = new Task.create({
            title,
            description,
            priority,
            isAssignedTo,
            createdBy: req.user._id,
        });

        res.status(201).json({
            status: "success",
            data: task
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"})
    }
}