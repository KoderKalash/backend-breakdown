// CRUD operations come here
import Task from "../models/tasks.models.js"
import User from "../models/user.models.js";

export const createTask = async (req, res) => {
    try {
        const { title, isAssignedTo, description, priority } = req.body
        if (!title || !isAssignedTo) return res.status(400).json({ message: "Bad request" });
        if (typeof title !== "string" || typeof isAssignedTo !== "string") return res.status(400).json({ message: "Bad request" });
        if (title.trim() === "" || isAssignedTo.trim() === "") return res.status(400).json({ message: "Bad request" });

        if (req.user.role === "employee") return res.status(403).json({ message: "User not Authorized" });

        const assignee = await User.findById(isAssignedTo);
        if (!assignee) return res.status(404).json({ message: "User not found" });

        const task = await Task.create({
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
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getTasks = async (req, res) => {
    try {
        const role = req.user.role;

        let tasks;
        if (role === "employee") {
            tasks = await Task.find({ isAssignedTo: req.user._id });
        } else {
            tasks = await Task.find({ createdBy: req.user._id });
        }
        // console.log(tasks);
        res.status(200).json({
            status: "success",
            total_tasks: tasks.length,
            tasks: tasks
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong..."
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const role = req.user.role;
        if (!taskId) return res.status(400).json({ message: "Bad Request" })
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" })

        if (role === "employee") {
            if (task.isAssignedTo.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" })
            const allowedupdate = ["status"];
            const bodyKeys = Object.keys(req.body);

            const valid = bodyKeys.every((k) => allowedupdate.includes(k));
            if (!valid) return res.status(403).json({ message: "Not allowed" });
        }

        delete req.body.createdBy;

        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true,
        }
        )

        res.status(200).json({
            status: "success",
            data:{task: updatedTask}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong..."
        })
    }
}

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const role = req.user.role;

    if (!taskId) return res.status(400).json({ message: "Bad Request" })
    const task = await Task.findById(taskId);
    if(!task) return res.status(404).json({ message: "Task not found" })

    if(role === "employee") return res.status(403).json({ message: "Not Allowed" })
    if(req.user._id.toString() !== task.createdBy.toString()) return res.status(403).json({ message: "Not Allowed" })
    
    await task.deleteOne();

    res.status(200).json({
        status: "success",
    })
}