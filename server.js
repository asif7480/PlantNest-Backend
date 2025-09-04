import express from "express"
import "dotenv/config"
import { connectDB } from "./config/db.config.mjs"
import errorHandler from "./middlewares/error.middleware.mjs"
import authRouter from "./routes/auth.routes.mjs"
import cookieParser from "cookie-parser"
import categoryRouter from "./routes/category.route.mjs"
import plantRouter from "./routes/plant.route.mjs"
import upload from "./middlewares/multer.middleware.mjs"
import uploadFileOnCloudinary from "./utils/cloudinary.mjs"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/category`, categoryRouter)
app.use(`/api/v1/plant`, plantRouter)


// app.post('/upload', upload.single("file"), async function(request, response){
//     console.log(request.file);

//     const uploadedOnCloudinary = await uploadFileOnCloudinary(request.file.path)

//     console.log(uploadedOnCloudinary.url);
    
//     response.status(201).json({
//         message: "File uploaded."
//     })
// })

app.use(errorHandler)
connectDB()
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})