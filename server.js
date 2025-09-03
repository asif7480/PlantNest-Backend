import express from "express"
import "dotenv/config"
import { connectDB } from "./config/db.config.mjs"
import errorHandler from "./middlewares/error.middleware.mjs"
import authRouter from "./routes/auth.routes.mjs"
import cookieParser from "cookie-parser"
import categoryRouter from "./routes/category.route.mjs"
import plantRouter from "./routes/plant.route.mjs"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/category`, categoryRouter)
app.use(`/api/v1/plant`, plantRouter)

app.use(errorHandler)
connectDB()
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})