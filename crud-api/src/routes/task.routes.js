import express from "express"
import protect from "../middlewares/auth.middlerware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

router
    .route("/tasks")
    .post(protect, createTask)
    .get(protect, getTasks)

router
    .route("/tasks/:taskId")
    .patch(protect, updateTask)
    .delete(protect, deleteTask)

export default router;