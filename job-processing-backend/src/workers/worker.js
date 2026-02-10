import { claimJob } from "../service/job.service.js";
import { Job } from "../models/job.models.js";

function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

async function processJob(job) {
    console.log(`Process job ${job._id} of type ${job.type}`);

    await sleep(1000);

    if (Math.random() < 0.3) { 
        throw new Error("Random failure occurred");
    }
}

export const startWorker = async () => {
    console.log("Worker started");

    while (true) {
        const job = await claimJob();

        if (!job) {
            await sleep(2000);
            continue;
        }

        try {
            await processJob(job);

            await Job.findByIdAndUpdate(job._id, {
                status: "COMPLETED",
            });

            console.log(`Job ${job._id} completed`);
        } catch (error) {
            await Job.findByIdAndUpdate(job._id, {
                status: "FAILED",
                lastError: error instanceof Error ? error.message : String(error),
            });

            console.error(`Job ${job._id} failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
};
