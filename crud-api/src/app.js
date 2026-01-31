import express from "express"
import statusRoute from "./routes/status.route.js"
import authRoute from "./routes/auth.routes.js"

const app = express()

app.use(express.json())
app.use("/api",statusRoute)
app.use("/api",authRoute)

export default app