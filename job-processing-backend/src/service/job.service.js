import { Job } from "../models/job.models.js"

export const claimJob = async () => {
    const job = await Job.findOneAndUpdate(
        {
            status: "PENDING",
        },
        {
            $set:{
                status: "PROCESSING",
                lockedAt: new Date()
            },
            $inc: {
                attempts: 1,
            }
        },
        {
            sort: {createdAt: 1},
            new: true
        }
    )

    return job;
}