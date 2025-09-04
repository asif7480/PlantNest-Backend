import { v2 as cloudinary } from "cloudinary"
import fs from "node:fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadFileOnCloudinary = async(local_path) => {
    try{
        if(!local_path) return null

        const response = await cloudinary.uploader.upload(
            local_path, { resource_type: "image" }
        )
    
        console.log(`File has been uploaded on cloudinary. URL: ${response.url}`)
        fs.unlinkSync(local_path)
        return response
    }catch(err){
        console.log(err.message);
    }
}

export default uploadFileOnCloudinary