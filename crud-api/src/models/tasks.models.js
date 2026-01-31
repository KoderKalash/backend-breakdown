import mongoose from "mongoose";
import User from "./user.models.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status:{
        type: String,
        enum: ["todo","in_progress","done"],
        default: "todo",
        required: true
    },
    priority:{
        type: String,
        enum: ["low","medium","high"],
        default: "medium",
        required: true
    },
    isAssignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

const Task = mongoose.model("Task", taskSchema)

export default Task