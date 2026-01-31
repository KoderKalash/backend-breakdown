import express from "express";

const router = express.Router();

router
    .route("/")
    .get((req,res)=>{
        res.status(200).json({
            status: "ok",
            uptime: process.uptime()
        })
    })

export default router