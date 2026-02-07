import express from "express"

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        status: "live",
        uptime: process.uptime()
    })
})

export default app