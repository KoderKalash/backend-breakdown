import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["EMAIL", "REPORT"]
    },
    payload: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
        default: "PENDING",
        index: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    lastError: {
        type: String
    },
    lockedAt: {
        type: Date,
    }
}, { timestamps: true })

export const Job = mongoose.model("Job", jobSchema)
